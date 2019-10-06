import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | log-source-select', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{log-source-select}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#log-source-select}}
        template block text
      {{/log-source-select}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
