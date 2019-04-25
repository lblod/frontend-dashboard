import Controller from '@ember/controller';
import { observer } from '@ember/object';


export default Controller.extend({
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
