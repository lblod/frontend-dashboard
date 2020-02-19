import Model, { attr, belongsTo } from '@ember-data/model'

export default class FileModel extends Model {
  @attr('string') filename;
  @attr('string') format;
  @attr('number') size;
  @attr('string') extension;
  @attr('datetime') created;
  @belongsTo('file') download;
}