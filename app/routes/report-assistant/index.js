import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ReportAssistantIndexRoute extends Route {
  @service reportAssistant;
  @service router;

  redirect() {
    const conversation = this.reportAssistant.conversation;
    if (conversation) {
      this.router.replaceWith('report-assistant.conversation', {
        queryParams: { conversation: conversation.id },
      });
    } else {
      this.router.replaceWith('report-assistant.conversation');
    }
  }
}
