import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task, dropTask } from 'ember-concurrency';

export default class ReportAssistantAttachment extends Component {
  @service intl;
  @service store;
  @service toaster;

  // The id of the ReportSpec saved for this spec file; null when not saved.
  @tracked reportSpecId = null;

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

  // Is this spec saved? Asks for the ReportSpec of this file. A failed
  // lookup leaves it as not saved: the save route answers with the id of a
  // spec that is already saved, so a second save does no harm.
  findReportSpec = task(async () => {
    try {
      const specs = await this.store.query('report-spec', {
        'filter[file][:id:]': this.args.document.id,
        page: { size: 1 },
      });
      this.reportSpecId = specs[0]?.id ?? null;
    } catch {
      this.reportSpecId = null;
    }
  });

  // Saves the spec as a report spec. From then on it is listed in the spec
  // tab and can run. A drop task: a second click while the request is open
  // is ignored. No answer at all (network down) counts as a failed save.
  save = dropTask(async () => {
    let res = null;
    try {
      res = await fetch('/assistant/report-specs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          conversation: this.args.conversation.id,
          spec: this.args.document.uri,
        }),
      });
    } catch {
      // handled below as save-failed
    }
    if (!res?.ok) {
      this.toaster.error(
        this.intl.t('dashboard.report-assistant.save-failed'),
        this.intl.t('dashboard.report-assistant.error'),
      );
      return;
    }
    this.reportSpecId = (await res.json()).id;
    this.toaster.success(
      undefined,
      this.intl.t('dashboard.report-assistant.saved'),
      { timeOut: 3000 },
    );
  });

  // Runs the saved spec of this attachment. The service checks the spec,
  // answers 202 and makes the report in the background, so a toast only
  // says the run started and where the report will show up. A drop task: a
  // second click while the request is open is ignored. No answer at all
  // (network down) counts as a failed start.
  run = dropTask(async () => {
    let res = null;
    try {
      res = await fetch(`/assistant/report-specs/${this.reportSpecId}/run`, {
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
