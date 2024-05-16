import EmberRouter from '@ember/routing/router';
import config from 'frontend-dashboard/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('app', { path: '/' }, function () {
    this.route('reports');
    this.route('errors');
    this.mount('@lblod/ember-jobs-dashboard-engine', { path: 'jobs' });
  });

  this.route('login');
  this.route('mock-login');
  this.route('acmidm-login');
  this.route('acmidm-callback', { path: '/authorization/callback' });

  this.route('route-not-found', {
    path: '/*wildcard',
  });
});
