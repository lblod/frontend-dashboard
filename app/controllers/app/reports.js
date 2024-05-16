import Controller from '@ember/controller';

export default class ReportsController extends Controller {
  page = 0;
  size = 15;
  sort = '-created';
}
