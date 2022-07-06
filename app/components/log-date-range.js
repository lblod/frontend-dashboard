import Component from '@glimmer/component';
import { sub, formatISO } from 'date-fns';
import { action } from '@ember/object';

export default class LogDateRangeComponent extends Component {
  get isFilterEnabled() {
    return this.args.fromValue || this.args.toValue;
  }

  @action
  resetFilter() {
    this.updateToValue(null);
    this.updateFromValue(null);
  }

  @action
  initRangeFilter() {
    const yesterday = sub(new Date(), {
      days: 1,
    });
    const today = new Date();
    this.updateFromValue(formatISO(yesterday, { representation: 'date' }));
    this.updateToValue(formatISO(today, { representation: 'date' }));
  }

  @action
  updateToValue(value) {
    this.args.onChange('logDateTo', value);
  }

  @action
  updateFromValue(value) {
    this.args.onChange('logDateFrom', value);
  }
}
