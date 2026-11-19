import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task, dropTask } from 'ember-concurrency';
import {
  findRunErrorKey,
  runReportSpec,
} from 'frontend-dashboard/utils/report-spec';

// The type the service writes as dct:type on a spec file: a concept of the
// portal's add-chat-attachment-types-codelist migration.
const SPEC_TYPE =
  'http://lblod.data.gift/concepts/6693014e-7b7d-448c-bb24-80c9758521f3';

export default class ReportAssistantAttachment extends Component {
  @service intl;
  @service store;
  @service toaster;

  // The ReportSpec of this spec file. The service writes it together with
  // the file; null until the lookup answers, or when it fails.
  @tracked reportSpec = null;

  constructor(owner, args) {
    super(owner, args);
    if (this.isSpec) this.findReportSpec.perform();
  }

  get isSpec() {
    return this.args.document.type === SPEC_TYPE;
  }

  // Asks for the ReportSpec of this file. A failed lookup leaves it null:
  // the spec then cannot be bookmarked or run from here. The include is
  // needed for the bookmark: without it ember-data holds both links as
  // empty, and a save would send them as null and remove them.
  findReportSpec = task(async () => {
    try {
      const specs = await this.store.query('report-spec', {
        'filter[file][:id:]': this.args.document.id,
        page: { size: 1 },
        include: 'file,conversation',
      });
      this.reportSpec = specs[0] ?? null;
    } catch {
      this.reportSpec = null;
    }
  });

  // Bookmarks the report spec of this attachment, or takes the bookmark off.
  // A bookmarked spec is listed in the spec tab. A drop task: a second click
  // while the request is open is ignored.
  toggleBookmark = dropTask(async () => {
    const spec = this.reportSpec;
    spec.bookmarked = !spec.bookmarked;
    try {
      await spec.save();
    } catch {
      spec.rollbackAttributes();
      this.toaster.error(
        this.intl.t('dashboard.report-assistant.bookmark-failed'),
        this.intl.t('dashboard.report-assistant.error'),
      );
      return;
    }
    this.toaster.success(
      undefined,
      this.intl.t(
        spec.bookmarked
          ? 'dashboard.report-assistant.bookmarked'
          : 'dashboard.report-assistant.bookmark-removed',
      ),
      { timeOut: 3000 },
    );
  });

  // Runs the report spec of this attachment. A toast only says the run
  // started and where the report will show up. A drop task: a second click
  // while the request is open is ignored.
  run = dropTask(async () => {
    try {
      await runReportSpec(this.reportSpec.id);
    } catch (error) {
      this.toaster.error(
        this.intl.t(findRunErrorKey(error)),
        this.intl.t('dashboard.report-assistant.error'),
      );
      return;
    }
    this.toaster.success(
      this.intl.t('dashboard.report-assistant.run-started'),
      this.args.document.filename,
      { timeOut: 8000 },
    );
  });
}
