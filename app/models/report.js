import Model, { attr, belongsTo } from '@ember-data/model';
import { isEnglishAccountsModelEnabled } from 'frontend-dashboard/utils/feature';

export default class ReportModel extends Model {
  @attr title;
  @attr description;
  @attr('date') created;
  @belongsTo('file', { async: true, inverse: null }) file;
  @belongsTo('report-spec', { async: true, inverse: 'reports' }) reportSpec;
  // Only the reports the chat service ran have this; the system reports of
  // report-generation-service do not.
  @belongsTo(isEnglishAccountsModelEnabled() ? 'user' : 'gebruiker', {
    async: true,
    inverse: null,
  })
  creator;
}
