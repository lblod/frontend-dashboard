import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  creationDate: attr('datetime'),
  author: attr(),
  reportContent: belongsTo('report-content'),
  period: belongsTo('period')
});
