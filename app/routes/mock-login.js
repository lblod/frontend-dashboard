import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MockLoginRoute extends Route {
  @service store;
  @service() session;

  beforeModel() {
    this.session.prohibitAuthentication('index');
  }

  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  model(params) {
    const filter = { provider: 'https://github.com/lblod/mock-login-service' };
    if (params.gemeente) filter.gebruiker = { achternaam: params.gemeente };
    return this.store.query('account', {
      include: 'gebruiker.bestuurseenheden',
      filter: {
        provider: 'https://github.com/lblod/mock-login-service',
        gebruiker: {
          achternaam: 'Agentschap Binnenlands Bestuur',
        },
      },
      page: { size: 10, number: params.page },
      sort: 'gebruiker.achternaam',
    });
  }
}
