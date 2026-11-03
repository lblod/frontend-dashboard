import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { renderMarkdown } from 'frontend-dashboard/utils/markdown';

export default class ChatMessage extends Component {
  @tracked showAttachments = false;

  // renderMarkdown sanitizes; htmlSafe only stops Ember from escaping it.
  get html() {
    return htmlSafe(renderMarkdown(this.args.message.content));
  }

  @action
  openAttachments() {
    this.showAttachments = true;
  }

  @action
  showText() {
    this.showAttachments = false;
  }
}
