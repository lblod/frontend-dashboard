import Component from '@glimmer/component';
import moment from 'moment';
import { computed } from '@ember/object';
import { action } from '@ember/object';

export default class LogDateRangeComponent extends Component {

  @computed('args.{fromValue,toValue}')
    get isFilterEnabled(){
      return this.args.fromValue || this.args.toValue;
    }

  @action
    resetFilter() {
      this.updateToValue(null);
      this.updateFromValue(null);
    }

  @action
    initRangeFilter() {
      const yesterday = moment().subtract(1, 'day').startOf('day');
      const today = moment().endOf('day');
      this.updateFromValue(yesterday.toDate());
      this.updateToValue(today.toDate());
    }

  @action
    updateToValue(value){
      this.args.onChange('logDateTo', value && value.toISOString())
    }

  @action
    updateFromValue(value){
      this.args.onChange('logDateFrom', value && value.toISOString())
    }
  }



