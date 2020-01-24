import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  created: attr('date'),
  file: belongsTo('file')
});
