import Model, { attr, belongsTo } from '@ember-data/model';

export default class ReportSpecModel extends Model {
  @attr title;
  @attr description;
  @attr('date') created;
  // The user bookmarked the spec: the spec tab lists only these.
  @attr('boolean') bookmarked;

  @belongsTo('file', { async: false, inverse: null }) file;
  @belongsTo('chat-conversation', { async: false, inverse: null }) conversation;
}
