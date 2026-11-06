import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class ReportAssistantAttachment extends Component {
  @service intl;

  get what() {
    const format = this.args.document.format || '';
    if (format.includes('turtle'))
      return this.intl.t('dashboard.report-assistant.attachment-turtle');
    if (format.includes('csv'))
      return this.intl.t('dashboard.report-assistant.attachment-csv');
    return this.intl.t('dashboard.report-assistant.attachment-file');
  }
}
