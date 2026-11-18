import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task, dropTask } from 'ember-concurrency';

export default class ReportAssistantAttachment extends Component {
  @service intl;
  @service store;
  @service toaster;

  // The ReportSpec of this spec file. The service writes it together with
  // the file; null for a spec file from before that.
  @tracked reportSpec = null;

  constructor(owner, args) {
    super(owner, args);
    if (this.isSpec) this.findReportSpec.perform();
  }

  get isSpec() {
    return (this.args.document.format || '').includes('turtle');
  }

  get what() {
    const format = this.args.document.format || '';
    if (this.isSpec)
      return this.intl.t('dashboard.report-assistant.attachment-turtle');
    if (format.includes('csv'))
      return this.intl.t('dashboard.report-assistant.attachment-csv');
    return this.intl.t('dashboard.report-assistant.attachment-file');
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

  // Runs the report spec of this attachment. The service checks the spec,
  // answers 202 and makes the report in the background, so a toast only
  // says the run started and where the report will show up. A drop task: a
  // second click while the request is open is ignored. No answer at all
  // (network down) counts as a failed start.
  run = dropTask(async () => {
    let res = null;
    try {
      res = await fetch(`/assistant/report-specs/${this.reportSpec.id}/run`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
      });
    } catch {
      // handled below as run-failed
    }
    if (res?.ok) {
      this.toaster.success(
        this.intl.t('dashboard.report-assistant.run-started'),
        this.args.document.filename,
        { timeOut: 8000 },
      );
      return;
    }
    const key =
      res?.status === 404
        ? 'run-not-found'
        : res?.status === 422
          ? 'run-invalid'
          : 'run-failed';
    this.toaster.error(
      this.intl.t(`dashboard.report-assistant.${key}`),
      this.intl.t('dashboard.report-assistant.error'),
    );
  });
}
