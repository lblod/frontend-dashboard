import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ReportAssistantConversationsRoute extends Route {
  @service store;

  queryParams = {
    page: { refreshModel: true },
  };

  model({ page }) {
    return this.store.query('chat-conversation', {
      sort: '-last-activity',
      'page[size]': 50,
      'page[number]': page,
      include: 'messages',
    });
  }
}
