import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class ChatMessageModel extends Model {
  @attr uri;
  @attr content;
  @attr('date') created;
  @attr maker;

  @belongsTo('chat-conversation', {
    async: false,
    inverse: 'messages',
    as: 'chat-message',
  })
  conversation;
  @hasMany('file', { async: false, inverse: null }) attachments;
}
