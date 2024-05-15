import BaseSessionService from 'ember-simple-auth/services/session';
import ENV from 'frontend-dashboard/config/environment';

export default class SessionService extends BaseSessionService {
  get isAcmIdmSession() {
    if (!this.isAuthenticated) {
      return false;
    }

    return this.data.authenticated.authenticator === 'authenticator:acm-idm';
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
