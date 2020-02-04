import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, DataTableRouteMixin, {
  modelName: 'report',
  queryParams: {
    page: {
      refreshModel: true
    }
  },
  session: service(),
  store: service(),
});
