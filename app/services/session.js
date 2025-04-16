import SessionService from 'ember-simple-auth/services/session';
import ENV from 'frontend-dashboard/config/environment';

export default class AppSessionService extends SessionService {
  get isAcmIdmSession() {
    if (!this.isAuthenticated) {
      return false;
    }

    return this.data.authenticated.authenticator === 'authenticator:acm-idm';
  }

  requireAuthentication(transition) {
    const loginRoute =
      ENV['routes'].login !== '{{LOGIN_ROUTE}}' ? ENV['routes'].login : 'login';

    return super.requireAuthentication(transition, loginRoute);
  }

  invalidate() {
    // We store the flag here since the data is cleared before the handleInvalidation method is called.
    this.wasAcmIdmSession = this.isAcmIdmSession;
    super.invalidate(...arguments);
  }

  handleInvalidation(logoutUrl) {
    if (this.wasAcmIdmSession) {
      logoutUrl = ENV.acmidm.logoutUrl;
    }

    super.handleInvalidation(logoutUrl);
  }
}
