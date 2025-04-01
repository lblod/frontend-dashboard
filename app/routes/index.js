import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class Index extends Route {
  @service router;

  beforeModel() {
    this.router.transitionTo('reports');
  }
}
