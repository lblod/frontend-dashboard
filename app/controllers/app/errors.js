import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import DefaultQueryParamsMixin from 'ember-data-table/mixins/default-query-params';

export default class ErrorsController extends Controller.extend(
  DefaultQueryParamsMixin
) {
  sort = '-datetime';
  page = 0;
  size = 15;
  queryParams = ['logLevelId', 'logSourceId', 'logDateFrom', 'logDateTo'];

  @tracked logLevelId = null;
  @tracked logSourceId = null;
  @tracked logDateFrom = null;
  @tracked logDateTo = null;

  get isFiltering() {
    return !!(
      this.logLevelId ||
      this.logSourceId ||
      this.logDateFrom ||
      this.logDateTo
    );
  }

  @action
  updateParam(name, value) {
    this[name] = value;
  }

  @action
  resetFilter() {
    this.queryParams.forEach((param) => {
      this[param] = null;
    });
  }
}
