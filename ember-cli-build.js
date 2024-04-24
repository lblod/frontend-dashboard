'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const envIsProduction = process.env.EMBER_ENV === 'production';

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: false,
    },
    minifyCSS: {
      enabled: envIsProduction,
    },
    sassOptions: {
      sourceMap: !envIsProduction,
      sourceMapEmbed: !envIsProduction,
    },
    autoprefixer: {
      enabled: true,
      cascade: true,
      sourcemap: !envIsProduction,
    },
    sourcemaps: {
      enabled: !envIsProduction,
      extensions: ['js', 'css'],
    },
    babel: {
      sourceMaps: 'inline',
    },
    '@appuniversum/ember-appuniversum': {
      dutchDatePickerLocalization: true,
    },
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },
  });

  return app.toTree();
};
