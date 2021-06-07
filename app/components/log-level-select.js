import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default class LogLevelSelectComponent extends Component {
  @service store;

  @tracked selected = null;
  @tracked options;

  constructor(){
    super(...arguments);
    this.options = this.store.query('log-level', {
      sort: 'label',
    });
    this.setAttributes()
  }

  async setAttributes() {
    if (this.args.value && !this.selected) {
      this.selected = await this.store.findRecord('log-level', this.args.value);
    } else if (!this.args.value) {
      this.selected = null;
    }
  }

  @task *search (term) {
    yield timeout(600);
    return this.store.query('log-level', {
      sort: 'label',
      filter: { label: term }
    });
  }

  @action
    changeSelected(selected) {
      this.selected = selected;
      this.args.onChange("logLevelId", selected && selected.id)
    }
}
