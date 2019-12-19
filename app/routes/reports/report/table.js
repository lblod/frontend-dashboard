import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    const report = await this.modelFor('reports.report')
    const content = await report.get('reportContent')
    const entries = await this.store.query('logEntry', {
      filter: { "report-content": { id: content.id } },
      page: { size: 999 }
   });
    return {entries}
  }
});
