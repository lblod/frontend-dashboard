import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import { action } from '@ember/object';

export default class ErrorsRoute extends Route.extend(DataTableRouteMixin) {
  modelName = 'log-entry';

  queryParams = {
    logLevelId: { refreshModel: true },
    logSourceId: { refreshModel: true },
    logDateFrom: { refreshModel: true },
    logDateTo: { refreshModel: true },
  };

  @action
  loading(transition, route) {
    let controller = this.controllerFor('errors');
    controller.set('isLoading', true);

    transition.finally(function () {
      controller.set('isLoading', false);
    });
  }

  mergeQueryOptions(params) {
    const query = {
      include: ['log-level', 'log-source'].join(','),
    };

    if (params.logLevelId) query['filter[log-level][id]'] = params.logLevelId;

    if (params.logSourceId)
      query['filter[log-source][id]'] = params.logSourceId;

    if (params.logDateFrom) query['filter[:gte:datetime]'] = params.logDateFrom;

    if (params.logDateTo) query['filter[:lte:datetime]'] = params.logDateTo;

    return query;
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('logLevelId', model.query['filter[log-level][id]']);
    controller.set('logSourceId', model.query['filter[log-source][id]']);
    controller.set('logDateFrom', model.query['filter[:gte:datetime]']);
    controller.set('logDateTo', model.query['filter[:lte:datetime]']);
  }
}
