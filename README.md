# frontend-dashboard

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd frontend-dashboard`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

To include in a semantic.works stack, include the following in docker-compose.yml:
```
  dashboard:
    image: lblod/frontend-dashboard
    links:
      - identifier:backend
    restart: always
```

In order to be able to log in with mu-login in the dashboard, you should include the mu-login-service in your docker-compose.yml:
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

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/release/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
