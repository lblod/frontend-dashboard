import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('log-report', params.id);
  },
  afterModel() { 
    this.transitionTo('reports.report.table');
  }
});
