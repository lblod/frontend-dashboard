import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Index extends Route {
  @service router;
  @service session;
  activate(transition) {
    this.session.requireAuthentication(transition, 'login');
    this.session.prohibitAuthentication('reports');
  }
}
