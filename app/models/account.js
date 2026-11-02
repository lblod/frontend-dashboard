import Model, { attr, belongsTo } from '@ember-data/model';
import { isEnglishAccountsModelEnabled } from 'frontend-dashboard/utils/feature';

class DutchAccountModel extends Model {
  @attr provider;
  @attr voId;
  @belongsTo('gebruiker', { async: false, inverse: 'accounts' }) gebruiker;
}

class EnglishAccountModel extends Model {
  @attr identifier;
  @attr provider;
  @belongsTo('user', { async: false, inverse: 'accounts' }) user;
  // The chat resources use the Dutch "gebruiker" resource name.
  @belongsTo('gebruiker', { async: true, inverse: 'accounts' }) gebruiker;
}

const AccountModel = isEnglishAccountsModelEnabled()
  ? EnglishAccountModel
  : DutchAccountModel;

export default AccountModel;
