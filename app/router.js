import EmberRouter from '@ember/routing/router';
import config from 'frontend-dashboard/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('mock-login');
  this.route('login');
  this.route('acmidm-login');
  this.route('acmidm-callback', { path: '/authorization/callback' });
  this.route('impersonate');

  this.route('reports');
  this.route('errors');
  this.route('jobs', function () {
    this.route('details', { path: '/:id' }, function () {});
    this.route('task', { path: '/task/:id' }, function () {
      this.route('input-containers-files');
      this.route('results-containers-files');
      this.route('input-containers-graph');
      this.route('results-containers-graph');
      this.route('input-containers-harvesting-collections');
    });
  });

  this.route('route-not-found', {
    path: '/*wildcard',
  });
});
