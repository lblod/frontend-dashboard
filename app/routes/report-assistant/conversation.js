import Route from '@ember/routing/route';
import { service } from '@ember/service';

// The agent that signs the answers: CHAT_ASSISTANT_URI in the service, seeded
// by the portal's chat-assistant migration. The public graph holds other
// prov:SoftwareAgents, so pick it by uri.
const ASSISTANT_URI = 'http://data.lblod.info/id/chat-agents/report-assistant';

export default class ReportAssistantConversationRoute extends Route {
  @service store;
  @service reportAssistant;

  queryParams = {
    conversation: { refreshModel: true },
  };

  async model({ conversation: id }) {
    if (!id) return { conversation: null, assistant: null };

    const [conversation, agents] = await Promise.all([
      this.store.findRecord('chat-conversation', id, {
        include: 'messages.attachments',
        reload: true,
      }),
      this.store.query('chat-agent', { filter: { ':uri:': ASSISTANT_URI } }),
    ]);
    return { conversation, assistant: agents[0] };
  }

  afterModel(model) {
    this.reportAssistant.conversation = model.conversation;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.poll.perform();
  }

  resetController(controller, isExiting, transition) {
    controller.poll.cancelAll();
    controller.send.cancelAll();
    super.resetController(controller, isExiting, transition);
  }
}
