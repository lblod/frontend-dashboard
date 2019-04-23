import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  className: attr(),
  source: attr(),
  message: attr(),
  resource: attr(),
  datetime: attr(),
  logLevel: belongsTo('log-level', { inverse: null }),
  statusCode: belongsTo('status-code', { inverse: null })
});
