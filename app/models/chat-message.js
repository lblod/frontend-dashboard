import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class ChatMessageModel extends Model {
  @attr uri;
  @attr content;
  @attr('date') created;
  @attr maker;

  @belongsTo('chat-conversation', {
    async: true,
    inverse: 'messages',
    as: 'chat-message',
  })
  conversation;
  @hasMany('file', { async: true, inverse: null }) attachments;
}
