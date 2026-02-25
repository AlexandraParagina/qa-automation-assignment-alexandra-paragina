const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    allowCypressEnv: true,
    env: {
      siteBaseUrl1: 'https://www.airportlabs.com',
      siteBaseUrl2: 'https://www.emag.ro'
    },
  },
});
