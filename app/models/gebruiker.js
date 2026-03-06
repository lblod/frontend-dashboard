import Model, { attr, hasMany } from '@ember-data/model';
import { isUseOrganizationsModelEnabled } from '../utils/feature';

export default class Gebruiker extends Model {
  @attr voornaam;
  @attr achternaam;
  @attr rijksregisterNummer;
  @hasMany('account', { async: true, inverse: 'gebruiker' }) accounts;
  @hasMany('bestuurseenheid', {
    async: true,
    inverse: null,
    polymorphic: true,
  })
  bestuurseenheden;
  @hasMany('organization', {
    async: true,
    inverse: null,
    polymorphic: true,
  })
  organizations;

  get group() {
    return isUseOrganizationsModelEnabled()
      ? this.hasMany('organizations').value().at(0)
      : this.hasMany('bestuurseenheden').value().at(0);
  }
  get fullName() {
    return `${this.voornaam} ${this.achternaam}`.trim();
  }
}
