import Controller from '@ember/controller';
import { observer } from '@ember/object';
import DefaultQueryParamsMixin from 'ember-data-table/mixins/default-query-params';

export default Controller.extend(DefaultQueryParamsMixin, {
  sort: '-datetime',

  filterChanged: observer('logLevelId', 'logSourceId', 'logDateFrom', 'logDateTo', function() {
    this.set('page', 0);
  }),

  actions: {
    resetFilters() {
      ['logLevelId',
       'logSourceId',
       'logDateFrom',
       'logDateTo'].forEach(filter => this.set(filter, null));
    }
  }
});
