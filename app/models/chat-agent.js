import Model, { attr } from '@ember-data/model';

export default class ChatAgentModel extends Model {
  @attr uri;
  @attr name;
  @attr description;
}
