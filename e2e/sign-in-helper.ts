import { browser, by, element } from 'protractor';

export class SignInHelper {
  private defaultUsername = 'alice';
  
  public signIn(username?: string) {
    element(by.id('navbar-sign')).getText().then(signInText => {
      if (signInText.indexOf('Sign-in') >= 0) {
        const usr = (username ? username : this.defaultUsername);
        browser.get('/sign-in');
        element(by.cssContainingText('a', 'Sign-in with Google')).click();
        // The login page is a non-angular page.
        // Hence we need to use webdriver instead of protractor on the login page
        browser.driver.findElement(by.id('username')).clear();
        browser.driver.findElement(by.id('username')).sendKeys(usr)
        browser.driver.findElement(by.tagName('button')).click();    
      }
    });
  }

  public signOut() {
    element(by.id('navbar-sign')).click();
    element(by.id('sign-out-link')).click();
  }

}