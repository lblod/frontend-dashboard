import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from 'frontend-loket-report/config/environment';
import { warn } from '@ember/debug';
import { inject as service } from '@ember/service';

export default Route.extend(ApplicationRouteMixin, {
  currentSession: service(),
  moment: service(),

  beforeModel() {
    const moment = this.moment;
    moment.setLocale('nl-be');
    moment.setTimeZone('Europe/Brussels');
    moment.set('defaultFormat', 'DD MMM YYYY, HH:mm');

    return this._loadCurrentSession();
  },
  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentSession();
  },
  _loadCurrentSession() {
    return this.currentSession.load().catch((e) => {
      warn(e, { id: 'session-load-failure' });
      this.session.invalidate();
    });

  }

});
