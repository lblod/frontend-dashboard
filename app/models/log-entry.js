import Model, { attr, belongsTo } from '@ember-data/model'

export default class LogEntryModel extends Model {
  @attr() className;
  @attr() message;
  @attr() specificInformation;
  @attr() datetime;
  @belongsTo('log-source', { inverse: null }) logSource;
  @belongsTo('log-level', { inverse: null }) logLevel;
  @belongsTo('status-code', { inverse: null }) statusCode;
}
