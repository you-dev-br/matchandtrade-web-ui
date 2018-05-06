import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToHome() {
		const width = 450;
		const height = 900;
		browser.driver.manage().window().setSize(width, height);
    return browser.get('/');
  }
}
