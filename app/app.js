import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'frontend-dashboard/config/environment';
import './models/custom-inflector-rules';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  engines = {
    '@lblod/ember-jobs-dashboard-engine': {
      dependencies: {
        services: ['store'],
      },
    },
  };
}

loadInitializers(App, config.modulePrefix);
