import DS from 'ember-data';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  count: attr('number'),
  logLevel: belongsTo('log-level'),
  entries: hasMany('log-entry')
});
