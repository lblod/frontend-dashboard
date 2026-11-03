import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ReportAssistantRoute extends Route {
  @service session;
  @service store;

  queryParams = {
    page: { refreshModel: true },
  };

  beforeModel(transition) {
    this.session.requireAuthentication(transition);
  }

  model({ page }) {
    return this.store.query('chat-conversation', {
      sort: '-last-activity',
      'page[size]': 50,
      'page[number]': page,
    });
  }
}
