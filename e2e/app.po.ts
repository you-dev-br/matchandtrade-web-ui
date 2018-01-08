import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToHome() {
    return browser.get('/');
  }

  elementTrades() {
    return element(by.cssContainingText('.router-link', 'Trades'));
  }

  elementSignin() {
    return element(by.cssContainingText('.router-link', 'Sign-in'));
  }

}
