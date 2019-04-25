import Controller from '@ember/controller';
import { observer } from '@ember/object';


export default Controller.extend({
  filterChanged: observer('logLevelId', 'logSourceId', function() {
    this.set('page', 0);
  }),

  actions: {
    resetFilters() {
      ['logLevelId',
       'logSourceId'].forEach(filter => this.set(filter, null));
    },
  }
});
