import SessionService from 'ember-simple-auth/services/session';
import ENV from 'frontend-dashboard/config/environment';

export default class AppSessionService extends SessionService {
  requireAuthentication(transition) {
    const loginRoute =
      ENV['routes'].login !== '{{LOGIN_ROUTE}}' ? ENV['routes'].login : 'login';

    return super.requireAuthentication(transition, loginRoute);
  }
}
