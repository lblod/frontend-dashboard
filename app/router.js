import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('errors');
  this.route('reports', function() {
    this.route('report', { path: ':id' }, function() {
      this.route('table');
    });
  });
});

export default Router;
