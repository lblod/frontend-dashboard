import Model, { attr, belongsTo } from '@ember-data/model'

export default class ReportModel extends Model {
  @attr('string') title;
  @attr('string') description;
  @attr('date') created;
  @belongsTo('file') file;
}