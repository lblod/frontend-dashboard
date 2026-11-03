import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ReportAssistantRoute extends Route {
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition);
  }

  // Keep the table or the open conversation in place while the next one
  // loads. An external transition still gets the application loading screen.
  @action
  loading(transition) {
    if (
      !transition.from ||
      !transition.from.name.startsWith('report-assistant')
    ) {
      return true;
    }
  }
}
