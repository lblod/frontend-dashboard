import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class ReportAssistantController extends Controller {
  @service reportAssistant;

  get conversation() {
    return this.reportAssistant.conversation;
  }

  get conversationQuery() {
    return this.conversation ? { conversation: this.conversation.id } : {};
  }
}
