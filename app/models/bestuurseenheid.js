import Model, { attr } from '@ember-data/model';

export default class BestuurseenheidModel extends Model {
  @attr('string') naam;
  @attr('string') alternatieveNaam;
}
