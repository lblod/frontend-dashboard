import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ChatSidebar extends Component {
  @service router;
  @service intl;

  // Not a destroyRecord: the service also removes the messages, the bijlagen
  // and the reports.
  @action
  async delete(conversation) {
    if (!window.confirm(this.intl.t('dashboard.chat.delete-confirm'))) return;
    const res = await fetch(`/assistant/conversations/${conversation.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      window.alert(this.intl.t('dashboard.chat.delete-failed'));
      return;
    }
    // Leave the open conversation before its route 404s.
    if (
      this.router.isActive('rapportassistent.conversation', conversation.id)
    ) {
      await this.router.transitionTo('rapportassistent');
    }
    this.router.refresh('rapportassistent');
  }

  // mu-cl-resources leaves page[number] out of the link to the first page.
  @action
  showPage(link) {
    this.router.transitionTo({ queryParams: { page: link.number || 0 } });
  }
}
