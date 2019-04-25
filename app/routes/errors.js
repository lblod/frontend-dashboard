import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default Route.extend(DataTableRouteMixin, {
  modelName: 'log-entry',

  queryParams: {
    page: { refreshModel: true },
    size: { refreshModel: true },
    sort: { refreshModel: true },
    // filter params
    logLevelId: { refreshModel: true },
    logSourceId: { refreshModel: true }
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

    return query;
  }
});
