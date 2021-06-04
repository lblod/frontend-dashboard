import Component from '@glimmer/component';
import moment from 'moment';
import { computed } from '@ember/object';
import { action } from '@ember/object';

export default class LogDateRangeComponent extends Component {
  label = 'Periode verstuurd';

  get fromValue(){
    return this.args.fromValue // ISO string
  }

  get toValue(){
    return this.args.toValue // ISO string
  }

  @computed('fromValue')
  get fromDate() {
    try {
      return new Date(Date.parse(this.fromValue));
    } catch(e) {
      return null;
    }
  }

  @computed('toValue')
  get toDate() {
    try {
      return new Date(Date.parse(this.toValue));
    } catch(e) {
      return null;
    }
  }

  @computed('fromValue', 'toValue')
  get isFilterEnabled(){
    return this.fromValue || this.toValue;
  }

  @action
    resetFilter() {
      this.args.onChangeFromValue(null);
      this.args.onChangeToValue(null);
    }

  @action
    initRangeFilter() {
      const yesterday = moment().subtract(1, 'day').startOf('day');
      const today = moment().endOf('day');
      this.args.onChangeFromValue(yesterday.toDate().toISOString());
      this.args.onChangeToValue(today.toDate().toISOString());
    }

  @action
    updateDate(varName, date) {
      const dateString = date.toISOString();
      if (varName == 'fromDate') {
        this.args.onChangeFromValue(dateString);
      } else {
        this.args.onChangeToValue(dateString);
      }
    }
  }



