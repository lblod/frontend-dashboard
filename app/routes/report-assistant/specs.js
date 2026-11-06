import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ReportAssistantSpecsRoute extends Route {
  @service store;

  queryParams = {
    page: { refreshModel: true },
    size: { refreshModel: true },
  };

  model({ page, size }) {
    return this.store.query('report-spec', {
      sort: '-created',
      page: { number: page, size },
      include: 'file,conversation',
    });
  }
}
