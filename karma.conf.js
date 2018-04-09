// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

		// Running chrome in headless mode
		// See: https://gist.github.com/cvuorinen/543c6f72f8ec917ebfd596802d387aa3
		// See: https://github.com/angular/protractor/blob/master/docs/browser-setup.md
		// See: https://cvuorinen.net/2017/05/running-angular-tests-in-headless-chrome/
		browsers: ['ChromeHeadless'],
    singleRun: false,
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
          '--headless',
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          '--remote-debugging-port=9222',
        ],
			}
		}
  });
};
