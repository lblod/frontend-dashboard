import Component from '@glimmer/component';
import { service } from '@ember/service';
import { dropTask } from 'ember-concurrency';
import {
  findRunErrorKey,
  runReportSpec,
} from 'frontend-dashboard/utils/report-spec';

export default class ReportAssistantReportSpecTable extends Component {
  @service router;
  @service intl;
  @service toaster;

  // Runs the spec again. A toast only says the run started and where the
  // report will show up. A drop task: a second click while the request is
  // open is ignored.
  run = dropTask(async (spec) => {
    try {
      await runReportSpec(spec.id);
    } catch (error) {
      this.toaster.error(
        this.intl.t(findRunErrorKey(error)),
        this.intl.t('dashboard.report-assistant.error'),
      );
      return;
    }
    this.toaster.success(
      this.intl.t('dashboard.report-assistant.run-started'),
      spec.title,
      { timeOut: 8000 },
    );
  });

  // Takes the bookmark off, so the spec leaves this list. The spec itself
  // stays, with its file, in its conversation. A drop task: a second click
  // while the request is open is ignored.
  removeBookmark = dropTask(async (spec) => {
    spec.bookmarked = false;
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
      this.intl.t('dashboard.report-assistant.bookmark-removed'),
      { timeOut: 3000 },
    );
    await this.router.refresh('report-assistant.specs');
  });
}
