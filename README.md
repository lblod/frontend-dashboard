# frontend-dashboard

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd frontend-dashboard`
- `npm install`

## Running / Development

- `npm run start`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `npm run test`
- `npm run test:ember -- --server`

### Linting

- `npm run lint`
- `npm run lint:fix`

### Building

- `npm exec ember build` (development)
- `npm run build` (production)

### Deploying

To include in a semantic.works stack, include the following in docker-compose.yml:
```
  dashboard:
    image: lblod/frontend-dashboard
    links:
      - identifier:backend
    restart: always
```


### Authentication methods

The dashboard supports different methods of authentication. The default login route can be configured by setting the `EMBER_LOGIN_ROUTE` environment variable.

#### `login` (default)

This is the default method, so the `EMBER_LOGIN_ROUTE` variable doesn't need to be set.

In order to be able to log in with mu-login in the dashboard, you should include the [mu-login-service](https://github.com/mu-semtech/login-service) in your docker-compose.yml:
```
  login:
    image: semtech/mu-login-service:2.9.1
    links:
      - database:database
```
dispatcher.ex should contain the following rule in order to get ember-mu-login working:
```
match "/sessions/*path", %{ accept: %{json: true} } do
    Proxy.forward conn, path, "http://login/sessions/"
end
```

### `mock-login`
The `mock-login` route needs the [mock-login-service](`https://github.com/lblod/mock-login-service`). Follow the instructions in the readme.

```yml
  dashboard:
    #...
    environment:
      EMBER_LOGIN_ROUTE: "mock-login"
```
### `acmidm-login`
The `acmidm-login` route needs the [acmidm-login-service](https://github.com/lblod/acmidm-login-service). Follow the instructions in the readme.

It also requires some extra environment variables in the frontend:

> The code snippet contains example values, adjust these based on your environment

```yml
  dashboard:
    #...
    environment:
      EMBER_LOGIN_ROUTE: "acmidm-login"
      EMBER_ACMIDM_CLIENT_ID: "client-id" 
      EMBER_ACMIDM_BASE_URL: "https://authenticatie.vlaanderen.be/op/v1/auth"
      EMBER_ACMIDM_REDIRECT_URL: "https://your-dashboard-domein/authorization/callback" 
      EMBER_ACMIDM_LOGOUT_URL: "https://authenticatie.vlaanderen.be/op/v1/logout"
      EMBER_ACMIDM_SCOPE: "openid rrn vo profile"
```

## User impersonations
The dashboard makes it possible for admin users to impersonate different user accounts so things can be verified without having to change accounts.

To enable this you need to configure the `EMBER_ADMIN_ROLE` environment variable and set up the impersonation service in your backend app.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
