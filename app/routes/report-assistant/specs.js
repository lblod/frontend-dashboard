import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ReportAssistantSpecsRoute extends Route {
  @service store;

  queryParams = {
    page: { refreshModel: true },
  };

  model({ page }) {
    return this.store.query('report-spec', {
      sort: '-created',
      'page[size]': 50,
      'page[number]': page,
      include: 'file,conversation',
    });
  }
}
