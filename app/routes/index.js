import Route from '@ember/routing/route';
import { service } from '@ember/service';
import {
  isErrorsRouteEnabled,
  isJobsRouteEnabled,
  isReportAssistantRouteEnabled,
  isReportsRouteEnabled,
} from '../utils/feature';

export default class Index extends Route {
  @service router;

  get initialRoute() {
    if (isReportsRouteEnabled()) {
      return 'reports';
    } else if (isErrorsRouteEnabled()) {
      return 'errors';
    } else if (isJobsRouteEnabled()) {
      return 'jobs';
    } else if (isReportAssistantRouteEnabled()) {
      return 'report-assistant';
    } else {
      throw new Error('At least one dashboard route needs to be enabled');
    }
  }

  beforeModel() {
    this.router.transitionTo(this.initialRoute);
  }
}
