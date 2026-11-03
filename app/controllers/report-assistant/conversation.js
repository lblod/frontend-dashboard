import Controller from '@ember/controller';

export default class ReportAssistantConversationController extends Controller {
  queryParams = ['conversation'];
  // No default on purpose: a `refreshModel` query param with a default
  // makes every RouterService transition into this route abort with
  // `TransitionAborted` (emberjs/ember.js#20512). Without a default the
  // model hook gets `conversation === undefined`, and the route shows the
  // new-conversation screen.
}
