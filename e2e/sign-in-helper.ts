import { browser, by, element } from 'protractor';
import { StorageService } from '../src/app/services/storage.service';


export class SignInHelper {
  private defaultUsername: string = 'alice';
  
  public signIn(username?: string) {
    element(by.id('navbar-sign')).click();    
    element(by.id('sign-in-link')).isPresent().then(isSignInPresent => {
      if (isSignInPresent) {
        // No need to re-sign in if it is already signed and username is not specified (just continue with the current signed user)      
        const chosenUsername = (username ? username : this.defaultUsername);
        browser.get('/sign-in');
        element(by.cssContainingText('a', 'Sign-in with Google')).click();
        // The login page is a non-angular page.
        // Hence we need to use webdriver instead of protractor on the login page
        browser.driver.findElement(by.id('username')).clear();
        browser.driver.findElement(by.id('username')).sendKeys(chosenUsername)
        browser.driver.findElement(by.tagName('button')).click();
      }
    });
  }

  public signOut() {
    element(by.id('navbar-sign')).click();
    element(by.id('sign-out-link')).click();
  }

}