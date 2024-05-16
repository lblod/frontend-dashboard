import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route.extend(DataTableRouteMixin) {
  @service session;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'index');
  }

  modelName = 'report';
  queryParams = {
    page: { refreshModel: true },
    size: { refreshModel: true },
    sort: { refreshModel: true },
  };
}
