import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  start: attr('datetime'),
  end: attr('datetime'),
});
