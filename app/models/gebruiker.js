import Model, { attr, hasMany } from '@ember-data/model';

export default class Gebruiker extends Model {
  @attr('string') voornaam;
  @attr('string') achternaam;
  @attr('string') rijksregisterNummer;
  @hasMany('account') accounts;
  @hasMany('bestuurseenheid') bestuurseenheden;

  get group() {
    return this.bestuurseenheden.firstObject;
  }
  get fullName() {
    return `${this.voornaam} ${this.achternaam}`.trim();
  }
}
