import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service currentSession;
  @service impersonation;
  @service session;

  get userInfo() {
    if (!this.currentSession.isLoaded) {
      return '';
    }

    let user;
    let group;
    let classification;

    if (this.impersonation.isImpersonating) {
      user = this.impersonation.originalAccount.gebruiker;
      group = this.impersonation.originalGroup;
      classification = group.classificatie;
    } else {
      user = this.currentSession.user;
      group = this.currentSession.group;
      classification = this.currentSession.groupClassification;
    }

    if (!user) {
      return '';
    }

    let userInfo = user.fullName;
    let groupInfo = '';

    if (classification?.label) {
      groupInfo += classification.label;
    }

    if (group?.naam) {
      groupInfo += ` ${group.naam}`;
    }

    groupInfo.trim();

    if (groupInfo.length) {
      userInfo += ` - ${groupInfo}`;
    }

    return userInfo;
  }

  @action
  invalidateSession() {
    this.session.invalidate();
  }
}
