import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ENV from 'frontend-dashboard/config/environment';

export default class AppRoute extends Route {
  @service session;

  beforeModel(transition) {
    const loginRoute =
      ENV['routes'].login !== '{{LOGIN_ROUTE}}'
        ? ENV['routes'].login
        : 'login';

    this.session.requireAuthentication(transition, loginRoute);
  }
}

