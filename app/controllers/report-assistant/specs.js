import Controller from '@ember/controller';

export default class ReportAssistantSpecsController extends Controller {
  queryParams = ['page'];
  // No default on purpose: a `refreshModel` query param with a default
  // makes every RouterService transition into this route abort with
  // `TransitionAborted` (emberjs/ember.js#20512). Without a default the
  // model hook gets `page === undefined`, and the adapter leaves
  // `page[number]` out of the request: the first page, same as the API's
  // own first-page link.
}
