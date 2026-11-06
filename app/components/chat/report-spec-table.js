import Component from '@glimmer/component';
import { service } from '@ember/service';
import { dropTask } from 'ember-concurrency';

export default class ChatReportSpecTable extends Component {
  @service intl;
  @service toaster;

  downloadHref(file) {
    return `/files/${file.id}/download?name=${encodeURIComponent(
      file.filename || '',
    )}`;
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
        this.intl.t('dashboard.chat.run-started'),
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
      this.intl.t(`dashboard.chat.${key}`),
      this.intl.t('dashboard.chat.error'),
    );
  });
}
