import Model, { attr, belongsTo } from '@ember-data/model';

export default class ReportModel extends Model {
  @attr title;
  @attr description;
  @attr('date') created;
  @belongsTo('file', { async: true, inverse: null }) file;
  @belongsTo('report-spec', { async: true, inverse: 'reports' }) reportSpec;
  // The report assistant agent. Only the reports the chat service ran have
  // this; the system reports of report-generation-service do not.
  @belongsTo('chat-agent', { async: true, inverse: null }) creator;
}
