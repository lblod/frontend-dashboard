import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { renderMarkdown } from 'frontend-dashboard/utils/markdown';

export default class ReportAssistantMessage extends Component {
  // renderMarkdown sanitizes; htmlSafe only stops Ember from escaping it.
  get html() {
    return htmlSafe(renderMarkdown(this.args.message.content));
  }
}
