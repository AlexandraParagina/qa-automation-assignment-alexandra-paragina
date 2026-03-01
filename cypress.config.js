const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {

    },
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    allowCypressEnv: true,
    env: {
      siteBaseUrl1: 'https://www.airportlabs.com',
      siteBaseUrl2: 'https://www.emag.ro'
    },
  },
});
