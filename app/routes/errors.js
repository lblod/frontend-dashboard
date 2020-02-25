import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin,DataTableRouteMixin, {
  modelName: 'log-entry',

  queryParams: {
    page: { refreshModel: true },
    size: { refreshModel: true },
    sort: { refreshModel: true },
    // filter params
    logLevelId: { refreshModel: true },
    logSourceId: { refreshModel: true },
    logDateFrom: { refreshModel: true },
    logDateTo: { refreshModel: true }
  },

  mergeQueryOptions(params) {
    const query = {
      include: [
        'log-level',
        'log-source'
      ].join(',')
    };

    if (params.logLevelId)
      query['filter[log-level][id]'] = params.logLevelId;

    if (params.logSourceId)
      query['filter[log-source][id]'] = params.logSourceId;

    if (params.logDateFrom)
      query['filter[:gte:datetime]'] = params.logDateFrom;

    if (params.logDateTo)
      query['filter[:lte:datetime]'] = params.logDateTo;

    return query;
  }
});
