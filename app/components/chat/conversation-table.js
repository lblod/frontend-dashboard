import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ChatConversationTable extends Component {
  @service router;
  @service intl;

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
    await this.router.refresh('report-assistant.conversations');
  }
}
