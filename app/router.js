import EmberRouter from '@ember/routing/router';
import config from 'frontend-dashboard/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.mount('@lblod/ember-jobs-dashboard-engine', { path: "jobs" });
  this.route('mock-login');
  this.route('login');
  this.route('errors');
  this.route('route-not-found', {
    path: '/*wildcard'
  });
  this.route('reports');
});
