import Controller from '@ember/controller';

export default class ReportAssistantSpecsController extends Controller {
  queryParams = ['page', 'size'];
  page = 0;
  size = 50;
}
