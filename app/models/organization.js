import Model, { attr, belongsTo } from '@ember-data/model';

export default class OrganizationModel extends Model {
  @attr uri;
  @attr naam;
  @attr alternatieveNaam;

  @belongsTo('organization-classification-code', {
    inverse: null,
    async: true,
    polymorphic: true,
  })
  classificatie;
}
