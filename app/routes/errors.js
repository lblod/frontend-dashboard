import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ErrorsRoute extends Route.extend(DataTableRouteMixin) {
  modelName = 'log-entry';
  @tracked isLoading = false;
  @service session;

  queryParams = {
    logLevelId: { refreshModel: true },
    logSourceId: { refreshModel: true },
    logDateFrom: { refreshModel: true },
    logDateTo: { refreshModel: true },
  };

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'index');
  }

  @action
  loading(transition /*, route*/) {
    //This used to be on the controller, but accessing a controller shouldn't be done outside the setupController method.
    //Just using this.isLoading does not work, because `this` is undefined. Weird because `this.controllerFor` works.
    //Using `this.set()` should not be done according to the template linter.
    //So what should we do then??? At least this does not give any errors:
    const me = this;
    me.set('isLoading', true);

    transition.finally(function () {
      me.set('isLoading', false);
    });
    return true;
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
