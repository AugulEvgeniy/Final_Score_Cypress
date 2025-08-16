const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
        on('task', {
        logCatch(message) {
          console.log(message);
          return null;
        }
      });
    },
  testIsolation: false,
  },
  defaultCommandTimeout: 7000
});
