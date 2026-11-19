import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { isReportAssistantRouteEnabled } from '../utils/feature';

export default class ReportsController extends Controller {
  @tracked isLoading = false;

  // The source column reads the chat service's prov:wasAttributedTo, so it
  // only shows when the report assistant is on.
  get showSource() {
    return isReportAssistantRouteEnabled();
  }

  queryParams = ['page', 'size', 'sort'];
  page = 0;
  size = 15;
  sort = '-created';
}
