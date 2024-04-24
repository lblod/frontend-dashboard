import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'frontend-dashboard/config/environment';

export default class ApplicationRoute extends Route {
  @service session;

  async beforeModel(transition) {
    await this.session.setup();

    // The engine doesn't have a route in which we can do the requireAuthentication check so we do it this way for now.
    // Without this extra check it would run for every child route (which already do the check themselvel), which causes issues in Ember v4.
    // TODO: add a new `app` route with a `/` path that can be used to nest all routes that require authentication.
    if (transition.to.name.includes('@lblod/ember-jobs-dashboard-engine')) {
      const loginRoute =
        ENV['routes'].login !== '{{LOGIN_ROUTE}}'
          ? ENV['routes'].login
          : 'login';
      this.session.requireAuthentication(transition, loginRoute);
    }
  }
}
