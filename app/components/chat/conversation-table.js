import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ChatConversationTable extends Component {
  @service router;
  @service intl;
  @service reportAssistant;

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
    if (this.reportAssistant.conversation?.id === conversation.id) {
      this.reportAssistant.conversation = null;
    }
    await this.router.refresh('report-assistant.conversations');
  }

  @action
  showPage(link) {
    this.router.transitionTo({ queryParams: { page: link.number || 0 } });
  }
}
