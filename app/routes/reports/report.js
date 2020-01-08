import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    const model = this.store.findRecord('log-report', params.id);
    return model
  },
  afterModel() { 
    this.transitionTo('reports.report.table');
  }
});
