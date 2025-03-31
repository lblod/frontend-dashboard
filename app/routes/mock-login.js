import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ENV from 'frontend-dashboard/config/environment';

export default class MockLoginRoute extends Route {
  @service store;
  @service session;

  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  beforeModel() {
    this.session.prohibitAuthentication('index');
  }

  model(params) {
    const filter = { provider: 'https://github.com/lblod/mock-login-service' };
    if (ENV['mock-login'].gebruikerfilter !== '{{GEBRUIKER_FILTER}}')
      filter.gebruiker = ENV['mock-login'].gebruikerfilter;
    if (params.gemeente) filter.gebruiker = { achternaam: params.gemeente };
    return this.store.query('account', {
      include: 'gebruiker.bestuurseenheden',
      filter: filter,
      page: { size: 10, number: params.page },
      sort: 'gebruiker.achternaam',
    });
  }
}
