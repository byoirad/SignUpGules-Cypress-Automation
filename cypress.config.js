const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://sign-up-gules.vercel.app/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
