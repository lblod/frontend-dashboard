import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'frontend-dashboard/config/environment';

export default class Index extends Route {
  @service router;
  @service session;
  @service currentSession;

  async beforeModel(transition) {
    const loginRoute =
      ENV['routes'].login !== '{{LOGIN_ROUTE}}' ? ENV['routes'].login : 'login';

    if (this.session.requireAuthentication(transition, loginRoute)) {
      await this.currentSession.load();
      this.router.transitionTo('reports');
    }
  }
}
