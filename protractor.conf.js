// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

// For information on protractor reporting https://www.npmjs.com/package/protractor-screenshoter-plugin
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts',
    './protractor-extra.config.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine2',
  plugins: [{
    package: 'protractor-screenshoter-plugin',
    screenshotPath: './temp/e2e-reports',
    imageToAscii: 'none',
    clearFoldersBeforeTest: true
  }],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    // Required by protractor-screenshoter-plugin
    return global.browser.getProcessedConfig().then(function(config) {
        // it is ok to be empty
    });
  }
};
