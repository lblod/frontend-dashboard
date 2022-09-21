import Model, { hasMany, attr } from '@ember-data/model';

export default class DataContainerModel extends Model {
  @attr uri;
  @attr hasGraph;
  @hasMany('file') files;
  @hasMany('harvesting-collection') harvestingCollections;
}
