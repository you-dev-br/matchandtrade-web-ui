import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getNavigationBar() {
    return element(by.className('navbar')).getText();
  }
}
