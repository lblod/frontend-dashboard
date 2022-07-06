import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'frontend-dashboard/config/environment';

export default class ApplicationRoute extends Route {
  @service session;

  beforeModel(transition) {
    const loginRoute =
      ENV['routes'].login !== '{{LOGIN_ROUTE}}' ? ENV['routes'].login : 'login';
    this.session.requireAuthentication(transition, loginRoute);
  }
}
