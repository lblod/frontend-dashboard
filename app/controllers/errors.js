import Controller from '@ember/controller';
import { observer } from '@ember/object';


export default Controller.extend({
  filterChanged: observer('logLevelId', 'sourceId', function() {
    this.set('page', 0);
  }),

  actions: {
    resetFilters() {
      ['logLevelId',
       'sourceId'].forEach(filter => this.set(filter, null));
    },
  }
});
