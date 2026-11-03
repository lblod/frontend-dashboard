import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

// The conversation shown in the first tab. The conversation route sets it;
// the tabs keep showing its title while another tab is open.
export default class ReportAssistantService extends Service {
  @tracked conversation = null;
}
