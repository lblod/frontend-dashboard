import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ReportAssistantConversationIndexRoute extends Route {
  @service router;

  redirect() {
    this.router.replaceWith('report-assistant.conversation.new');
  }
}
