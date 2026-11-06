import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ReportAssistantConversationsRoute extends Route {
  @service store;

  queryParams = {
    page: { refreshModel: true },
    size: { refreshModel: true },
  };

  model({ page, size }) {
    return this.store.query('chat-conversation', {
      sort: '-last-activity',
      page: { number: page, size },
      include: 'messages',
    });
  }
}
