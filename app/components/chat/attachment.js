import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class ChatAttachment extends Component {
  @service intl;

  // The file service names the download after the physical file
  // (<uuid>.csv) unless ?name= says otherwise.
  get href() {
    const name = encodeURIComponent(this.args.document.filename || '');
    return `/files/${this.args.document.id}/download?name=${name}`;
  }

  get what() {
    const format = this.args.document.format || '';
    if (format.includes('turtle'))
      return this.intl.t('dashboard.chat.attachment-turtle');
    if (format.includes('csv'))
      return this.intl.t('dashboard.chat.attachment-csv');
    return this.intl.t('dashboard.chat.attachment-file');
  }
}
