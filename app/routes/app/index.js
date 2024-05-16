import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AppIndexRoute extends Route {
  @service router;

  beforeModel() {
    this.router.replaceWith('app.reports');
  }
}
