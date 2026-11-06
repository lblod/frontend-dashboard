import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class ReportSpecModel extends Model {
  @attr title;
  @attr description;
  @attr('date') created;

  @belongsTo('file', { async: false, inverse: null }) file;
  @belongsTo('chat-conversation', { async: false, inverse: null }) conversation;
  @hasMany('report', { async: true, inverse: 'reportSpec' }) reports;
}
