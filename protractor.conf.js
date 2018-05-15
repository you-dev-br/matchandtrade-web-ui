// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

// For information on protractor reporting https://www.npmjs.com/package/protractor-screenshoter-plugin
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 900000,
  specs: [
    './protractor-extra.conf.js',
    './e2e/**/*.e2e-spec.ts'
  ],

	// Running chrome in headless mode
	// See: https://gist.github.com/cvuorinen/543c6f72f8ec917ebfd596802d387aa3
	// See: https://github.com/angular/protractor/blob/master/docs/browser-setup.md
	// See: https://cvuorinen.net/2017/05/running-angular-tests-in-headless-chrome/
  capabilities: {
		'browserName': 'chrome',
		chromeOptions: {
			// For headless testing use: args: [ "--headless", "--disable-gpu", "--window-size=450x700" ]
			args: [ '--disable-gpu', '--window-size=450x700' ]
		}
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
    defaultTimeoutInterval: 180000,
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
