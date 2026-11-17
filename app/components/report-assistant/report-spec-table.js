import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency';

export default class ReportAssistantReportSpecTable extends Component {
  @service router;
  @service intl;
  @service toaster;

  // The report spec the confirm modal asks about; null closes the modal.
  @tracked specToDelete = null;

  @action
  askDelete(spec) {
    this.specToDelete = spec;
  }

  @action
  cancelDelete() {
    this.specToDelete = null;
  }

  // Asks the service to run the spec again. The service checks the spec,
  // answers 202 and makes the report in the background, so a toast only
  // says the run started and where the report will show up. A drop task: a
  // second click while the request is open is ignored. No answer at all
  // (network down) counts as a failed start.
  run = dropTask(async (spec) => {
    let res = null;
    try {
      res = await fetch(`/assistant/report-specs/${spec.id}/run`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
      });
    } catch {
      // handled below as run-failed
    }
    if (res?.ok) {
      this.toaster.success(
        this.intl.t('dashboard.report-assistant.run-started'),
        spec.title,
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

  // A drop task: a second click while the request is open is ignored. No
  // answer at all (network down) counts as a failed delete.
  delete = dropTask(async () => {
    const spec = this.specToDelete;
    let res = null;
    try {
      res = await fetch(`/assistant/report-specs/${spec.id}`, {
        method: 'DELETE',
      });
    } catch {
      // handled below as delete-report-spec-failed
    }
    this.specToDelete = null;
    if (!res?.ok) {
      this.toaster.error(
        this.intl.t('dashboard.report-assistant.delete-report-spec-failed'),
        this.intl.t('dashboard.report-assistant.error'),
      );
      return;
    }
    this.toaster.success(
      undefined,
      this.intl.t('dashboard.report-assistant.report-spec-deleted'),
      {
        timeOut: 3000,
      },
    );
    await this.router.refresh('report-assistant.specs');
  });
}
