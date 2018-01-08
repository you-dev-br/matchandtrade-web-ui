import { browser, by, element } from 'protractor';

export class SignInUtil {

  public signIn() {
    // browser.get('/sign-in');
    element(by.cssContainingText('.router-link', 'Sign-in')).click();
    element(by.cssContainingText('a', 'Sign-in with Google')).click();
  }

}