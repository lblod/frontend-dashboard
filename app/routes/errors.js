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
    sourceId: { refreshModel: true }
  },

  mergeQueryOptions(params) {
    const query = {
      include: [
        'log-level',
      ].join(',')
    };

    if (params.logLevelId)
      query['filter[log-level][id]'] = params.logLevelId;

    if (params.sourceId)
      query['filter[source][id]'] = params.sourceId;

    return query;
  }
});
