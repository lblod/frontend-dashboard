import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  aggregate: hasMany('aggregate'),
  logEntry: hasMany('log-entry')
});
