import { browser, by, element } from 'protractor';

export class SignInHelper {

  public signIn(username?: string) {
    const usr = (username ? username : 'alice');
    browser.get('/sign-in');
    element(by.cssContainingText('a', 'Sign-in with Google')).click();
    // The login page is a non-angular page.
    // Hence we need to use webdriver instead of protractor on the login page
    browser.driver.findElement(by.id('username')).clear();
    browser.driver.findElement(by.id('username')).sendKeys(usr)
    browser.driver.findElement(by.tagName('button')).click();
  }

}