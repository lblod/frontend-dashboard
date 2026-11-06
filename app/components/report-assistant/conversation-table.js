import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency';

export default class ReportAssistantConversationTable extends Component {
  @service router;
  @service intl;
  @service toaster;

  // The conversation the confirm modal asks about; null closes the modal.
  @tracked conversationToDelete = null;

  @action
  askDelete(conversation) {
    this.conversationToDelete = conversation;
  }

  @action
  cancelDelete() {
    this.conversationToDelete = null;
  }

  // A drop task: a second click while the request is open is ignored. No
  // answer at all (network down) counts as a failed delete.
  delete = dropTask(async () => {
    const conversation = this.conversationToDelete;
    let res = null;
    try {
      res = await fetch(`/assistant/conversations/${conversation.id}`, {
        method: 'DELETE',
      });
    } catch {
      // handled below as delete-failed
    }
    this.conversationToDelete = null;
    if (!res?.ok) {
      this.toaster.error(
        this.intl.t('dashboard.report-assistant.delete-failed'),
        this.intl.t('dashboard.report-assistant.error'),
      );
      return;
    }
    this.toaster.success(
      undefined,
      this.intl.t('dashboard.report-assistant.deleted'),
      {
        timeOut: 3000,
      },
    );
    await this.router.refresh('report-assistant.conversations');
  });
}
