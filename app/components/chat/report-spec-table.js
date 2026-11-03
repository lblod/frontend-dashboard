import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ChatReportSpecTable extends Component {
  @service router;

  downloadHref(file) {
    return `/files/${file.id}/download?name=${encodeURIComponent(
      file.filename || '',
    )}`;
  }

  @action
  showPage(link) {
    this.router.transitionTo({ queryParams: { page: link.number || 0 } });
  }
}
