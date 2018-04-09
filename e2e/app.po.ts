import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToHome() {
		const width = 450;
		const height = 1000;
		// browser.driver.manage().window().setSize(width, height);
    return browser.get('/');
  }

  elementTrades() {
    return element(by.cssContainingText('.router-link', 'Trades'));
  }

  elementSignin() {
    return element(by.cssContainingText('.router-link', 'Sign-in'));
  }

}
