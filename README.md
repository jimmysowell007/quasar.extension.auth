# Quasar App Extension plugin.auth

> Add a short description of your App Extension. What does it do? How is it beneficial? Why would someone want to use it?

[![npm](https://img.shields.io/npm/v/quasar-app-extension-plugin.auth.svg?label=quasar-app-extension-plugin.auth)](https://www.npmjs.com/package/quasar-app-extension-plugin.auth)
[![npm](https://img.shields.io/npm/dt/quasar-app-extension-plugin.auth.svg)](https://www.npmjs.com/package/quasar-app-extension-plugin.auth)

# Install

```bash
quasar ext add mamy-auth
```

Quasar CLI will retrieve it from NPM and install the extension.

## Prompts

When installing the Auth app extension, you will be prompted with fourteen questions:

1. Route for authentication

The default is /login, it allows you to define the login route

2. Route where the user will be redirected once connected

The default is /, you can define where you want to be redirect once connected

3. Route for code verification after performing the forgotten password

The default is /check_code, you can define other route

4. Route for password update

The default is /reset_password

5. Basic server route

The default is http://localhost:3000, you must point it to your server base url

6. Server route for authentication

The default is /users/sign_in

7. Server route to reset password

The default is /users/reset_password

8. Server route to update password

The default is /users/passwords

9. Authorization type

The default is Bearer but you can change it according to your needs

10. Vuex mutation to set token

The default is auth/setToken in the auth module.
It can be changed from the moment it takes the token in parameter

11. Vuex mutation to clear token and all user state

The default is auth/clearToken in the auth module but can be changed

12. Vuex mutation to set user information when resetting password (email or phone number)

The default is auth/setInfosUser in auth module.
It takes email or phone number, can be changed

13. Vuex getter to return token

The default is auth/getToken and return token, can be changed.

14. Vuex getter to return user information

The default is auth/getInfosUser and return email or phone number

# Uninstall

```bash
quasar ext remove mamy-auth
```

# Info

The parent application must provide the following mutations:

A mutation to store the token, it takes the token in parameter

A mutation to clean the token and the user information

A mutation to define the user information during the process of forgotten password (email or phone number), it takes in parameter the email or the phone number.

A getter which returns the token

A getter that returns the email or the phone number defined during the process of forgotten password.

When installing the extension, the path to these mutations and getters must be provided.
As well as the different routes of the pages and APIs, without forgetting the type of authorization.

# Usage

In auth mutation:

    export function setToken(state, payload) {
        state.token = payload
    }

    export function clearToken(state) {
        state.token = null
    }

In auth getter:

    export function getToken(state) {
        return state.token
    }

# Parent Application (UI)

A Quasar Framework app for Auth Extension

## Install the dependencies

```bash
yarn dep
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
yarn dev
```

### Lint the files

```bash
yarn lint
```

### Launch test with Cypress Studio

```bash
yarn test:e2e
```

### Launch test with Cypress mode CI (Continuous Integration )

```bash
yarn test:e2e:ci
```

### Customize the configuration

See dev/[Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).

# Info

Cypress automatically after being launched.

# Usage

## For Cypress Studio

Launch test E2E mode and select your test file

## For Cypress Continuous Integration mode

Launch test E2E with Continuous integration mode and cypress test all file in directory:

```bash
    /test/cypress/integration/
```

# netlify-plugin-cypress
[![CircleCI](https://circleci.com/gh/cypress-io/netlify-plugin-cypress/tree/master.svg?style=svg&circle-token=9cbb587a5a0ae4ce28b011dd03d10d66de906708)](https://circleci.com/gh/cypress-io/netlify-plugin-cypress/tree/master) [![renovate-app badge][renovate-badge]][renovate-app] [![netlify-plugin-cypress](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/ixroqc/master&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/ixroqc/runs) [![Netlify Status](https://api.netlify.com/api/v1/badges/76892baf-2ad8-4642-b283-f2135963ff51/deploy-status)](https://app.netlify.com/sites/sad-lumiere-6a00a5/deploys)
> Runs Cypress end-to-end tests on Netlify Build
## Install and use

You can install this plugin in the Netlify UI from this [direct in-app installation link](https://app.netlify.com/plugins/netlify-plugin-cypress/install) or from the [Plugins directory](https://app.netlify.com/plugins).

For file based installation, add `netlify-plugin-cypress` NPM package as a dev dependency to your repository.

```shell
npm install --save-dev netlify-plugin-cypress
# or
yarn add -D netlify-plugin-cypress
```

And then add the plugin's name to the list of build plugins in `netlify.toml` file as shown in the examples below.

*note:* this plugin assumes you have already installed Cypress as a dev NPM dependency.


## How does it work

### Build steps

When Netlify Build system runs it performs 2 steps essentially:

1. builds the site
2. deploys the site

Every plugin that wants to perform some actions can do so before the build, after the build (but before the deploy), and after the deploy. The Netlify uses the following names for these events

```
"preBuild"
1. builds the site
"postBuild"
2. deploys the site
"onSuccess"
"onFailure"
```

Thus every plugin can register itself to be executed before a site is built using "preBuild" event, or after a successful deploy using "onSuccess" event name, etc.

### This plugin

This plugin `netlify-plugin-cypress` by default runs during the "onSuccess" event, testing the deployed site. The Netlify Build system gives the URL to the plugin and it runs Cypress against that URL using the [Cypress NPM module API](https://on.cypress.io/module-api).

Optionally, you can also run tests during "preBuild" and "postBuild" steps. This is useful if you want to ensure the site is working even before deploying it to Netlify servers. Finally, this plugin does not use "onFailure" event which happens only if Netlify fails to deploy the site.

### Failing the deploy

Running Cypress tests by default uses the "onSuccess" step of the build pipeline. By this point Netlify has already deployed the site. Even if the tests fail now, the Netlify shows the successful deployment - the site is live! To really prevent the broken deploys, we suggest using [Cypress GitHub / GitLab / Bitbucket integration](https://on.cypress.io/github-integration) to fail the _status checks_ on a pull request.

We also suggest running tests during the "preBuild" and/or "postBuild" steps. If the tests fail during these steps, the Netlify fails the entire build and does not deploy the broken site.

Finally, you can set up [Slack notifications](https://on.cypress.io/slack-integration) on failed tests against the deployed site. At least you will quickly find out if the deployed site fails the E2E tests and would be able to roll back the deploy.

## Examples

### basic

Here is the most basic [Netlify config file](https://docs.netlify.com/configure-builds/file-based-configuration/) `netlify.toml` with just the Cypress plugin

```toml
[[plugins]]
  # runs Cypress tests against the deployed URL
  package = "netlify-plugin-cypress"
```

### tutorial

Read the full tutorial at [Test Sites Deployed To Netlify Using netlify-plugin-cypress](https://glebbahmutov.com/blog/test-netlify/).

**Note:** if any tests against the deployed URL fail, the Netlify build still considers it a success. Thus if you want to have a test check against the deploy, install [Cypress GitHub App](https://on.cypress.io/github-integration). The app will provide its own failing status check in this case.

### options

You can control the browser, the specs to run, record tests on Cypress Dashboard, etc, see [manifest.yml](./manifest.yml) file.

### recording

To record test results and artifacts on Cypress Dashboard, set `record: true` plugin input and set `CYPRESS_RECORD_KEY` as an environment variable via Netlify Deploy settings.

```yaml
[build]
command = "npm run build"
publish = "build"
  [build.environment]
  # cache Cypress binary in local "node_modules" folder
  # so Netlify caches it
  CYPRESS_CACHE_FOLDER = "./node_modules/CypressBinary"
  # set TERM variable for terminal output
  TERM = "xterm"
[[plugins]]
# runs Cypress tests against the deployed URL
package = "netlify-plugin-cypress"
  [plugins.inputs]
  record = true
```

See [cypress-example-kitchensink](https://github.com/cypress-io/cypress-example-kitchensink) and recorded results at Cypress Dashboard [![netlify-plugin-cypress](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/ixroqc/master&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/ixroqc/runs)

**Security note 🔐:** you should keep your `CYPRESS_RECORD_KEY` secret. You can control how Netlify builds external pull requests, see [the doc](https://docs.netlify.com/configure-builds/environment-variables/) - you never want to expose sensitive environment variables to outside builds.

#### status checks

If you are recording test results to Cypress Dashboard, you should also install [Cypress GitHub Integration App](https://on.cypress.io/github-integration) to see status checks from individual groups or from individual specs per commit. See [netlify-plugin-prebuild-example PR #8](https://github.com/cypress-io/netlify-plugin-prebuild-example/pull/8) pull request for an example.

![Netlify to Cypress Dashboard to GH Integration checks](./images/netlify-to-cy-gh-app-checks.png)

#### group

You can change the group name for the recorded run using `group` parameter

```toml
[[plugins]]
# runs Cypress tests against the deployed URL
package = "netlify-plugin-cypress"
  [plugins.inputs]
  record = true
  group = "built site"
```

#### tag

You can give recorded run [tags](https://on.cypress.io/module-api#cypress-run) using a comma-separated string. If the tag is not specified, Netlify context will be used (`production`, `deploy-preview` or `branch-deploy`)

```toml
[[plugins]]
# runs Cypress tests against the deployed URL
package = "netlify-plugin-cypress"
  [plugins.inputs]
  record = true
  group = "built site"
  tag = "nightly,production"
```

### spec

Run only a single spec or specs matching a wildcard

```toml
[build]
command = "npm run build"
publish = "build"
  [build.environment]
  # cache Cypress binary in local "node_modules" folder
  # so Netlify caches it
  CYPRESS_CACHE_FOLDER = "./node_modules/CypressBinary"
  # set TERM variable for terminal output
  TERM = "xterm"
[[plugins]]
# runs Cypress tests against the deployed URL
package = "netlify-plugin-cypress"
  [plugins.inputs]
  spec = "cypress/integration/smoke*.js"
```

See [cypress-example-kitchensink](https://github.com/cypress-io/cypress-example-kitchensink) for instance.

### browser

By default all tests run using the Chromium browser. If you want to use Electron:

```toml
[build]
command = "npm run build"
publish = "build"
  [build.environment]
  # cache Cypress binary in local "node_modules" folder
  # so Netlify caches it
  CYPRESS_CACHE_FOLDER = "./node_modules/CypressBinary"
  # set TERM variable for terminal output
  TERM = "xterm"
[[plugins]]
package = "netlify-plugin-cypress"
  [plugins.inputs]
  # allowed values: electron, chromium
  browser = "electron"
```

### configFile

If you would like to use a different Cypress config file instead of `cypress.json`, specify it using the `configFile` option

```toml
[build]
command = "npm run build"
publish = "build"
  [build.environment]
  # cache Cypress binary in local "node_modules" folder
  # so Netlify caches it
  CYPRESS_CACHE_FOLDER = "./node_modules/CypressBinary"
  # set TERM variable for terminal output
  TERM = "xterm"
[[plugins]]
package = "netlify-plugin-cypress"
  [plugins.inputs]
  configFile = "cypress.netlify.json"
```

### testing SPA routes

SPAs need catch-all redirect setup to make non-root paths accessible by tests. You can enable this with `spa` parameter.

```
[[plugins]]
# local Cypress plugin will test our site after it is built
package = "netlify-plugin-cypress"
  [plugins.inputs]
  # can also use "spa = true" to use "index.html" by default
  spa = "index.html"
```

### testing the site before build

By default this plugin tests static site _after deploy_. But maybe you want to run end-to-end tests against the _local development server_. You can start the local server, wait for it to respond and then run Cypress tests by passing parameters to this plugin. Here is a sample config file

```toml
[[plugins]]
  package = "netlify-plugin-cypress"
  # let's run tests against development server
  # before building it (and testing the built site)
  [plugins.inputs.preBuild]
    enable = true
    start = 'npm start'
    wait-on = 'http://localhost:5000'
    wait-on-timeout = '30' # seconds
```

Parameters you can place into `preBuild` inputs: `start`, `wait-on`, `wait-on-timeout`, `spec`, `record`, `group`, and `tag`.

See [netlify-plugin-prebuild-example](https://github.com/cypress-io/netlify-plugin-prebuild-example) repo

### testing the site after build

By default this plugin tests static site _after deploy_. But maybe you want to run end-to-end tests locally after building the static site. Cypress includes a local static server for this case but you can specify your own command if needed by using the `start` argument. Here is a sample config file

```toml
[[plugins]]
  package = "netlify-plugin-cypress"
  # let's run tests against the built site
  [plugins.inputs.postBuild]
    enable = true
```

Parameters you can place into `postBuild` inputs: `spec`, `record`, `group`, `tag`, `start` and `spa`.

#### The SPA parameter

If your site requires all unknown URLs to redirect back to the index page, use the `spa` parameter

```toml
[[plugins]]
  package = "netlify-plugin-cypress"
  # let's run tests against the built site
  [plugins.inputs.postBuild]
    enable = true
    # must allow our test server to redirect unknown routes to "/"
    # so that client-side routing can correctly route them
    # can be set to true or "index.html" (or similar fallback filename in the built folder)
    spa = true
    start = 'npm start'
```

### using Netlify CLI

Even better when testing the prebuilt site is to run the [Netlify CLI](https://cli.netlify.com/) to make sure the local API redirects and Netlify functions work in addition to the web site. Add `netlify-cli` as a dev dependency and start it during testing.

```shell
$ npm i -D netlify-cli
```

```toml
[[plugins]]
  package = "netlify-plugin-cypress"
  # start Netlify server
  [plugins.inputs.preBuild]
    start = 'npx netlify dev'
    wait-on = 'http://localhost:8888'
```

For more, see [tests/test-netlify-dev](./tests/test-netlify-dev) example and read [Testing Netlify Function](https://glebbahmutov.com/blog/test-netlify/#testing-netlify-functions) section.

### skipping tests

If you are testing the site before building it and want to skip testing the deployed URL

```toml
[[plugins]]
  package = "netlify-plugin-cypress"
  # do not test the deployed URL
  [plugins.inputs]
    enable = false
  # test the local site
  [plugins.inputs.preBuild]
    enable = true
```

### parallelization

Running tests in parallel **is not supported** because Netlify plugin system runs on a single machine. Thus you can record the tests on Cypress Dashboard, but not run tests in parallel. If Netlify expands its build offering by allowing multiple build machines, we could take advantage of it and run tests in parallel.

### HTML files

When serving the built folder, we automatically serve `.html` files. For example, if your folder has the following structure:

```
public/
  index.html
  pages/
    about.html
```

The `public` folder is served automatically and the following test successfully visits both the root and the `about.html` pages:

```js
cy.visit('/')
cy.visit('/pages/about') // visits the about.html
```
**Warning:** be careful with verbose logging, since it can print all environment variables passed to the plugin, including tokens, API keys, and other secrets.

# Donate

If you appreciate the work that went into this App Extension, make donation to [Sowell](https://www.sowellapp.com)

# License

MIT (c) Sowell
