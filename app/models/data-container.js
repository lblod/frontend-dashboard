import Model, { attr, hasMany } from '@ember-data/model'

export default class DataContainerModel extends Model {
  @attr('string') uri;
  @attr('string') hasGraph;
  @hasMany('file') files;
  @hasMany('harvesting-collection') harvestingCollections;
}
