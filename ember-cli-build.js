'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const envIsProduction = process.env.EMBER_ENV === 'production';

module.exports = async function (defaults) {
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
      disableWormholeElement: true,
      dutchDatePickerLocalization: true,
    },
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },
  });

  const { setConfig } = await import('@warp-drive/build-config');
  setConfig(app, __dirname, {
    deprecations: {
      DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: false,
    },
  });

  return app.toTree();
};
