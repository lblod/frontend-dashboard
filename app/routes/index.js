import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'frontend-dashboard/config/environment';

export default class Index extends Route {
  @service router;
  @service session;

  // activate(transition) {
  //   const loginRoute =
  //     ENV['routes'].login !== '{{LOGIN_ROUTE}}' ? ENV['routes'].login : 'login';
  //   this.session.requireAuthentication(transition, loginRoute);
  //   this.session.prohibitAuthentication('reports');
  // }
}
