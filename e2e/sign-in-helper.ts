import { browser, by, element } from 'protractor';
import { StorageService } from '../src/app/services/storage.service';


export class SignInHelper {
	private defaultUsername: string = 'alice';
  
  public signIn(username?: string) {
		browser.driver.getCurrentUrl()
			.then(url => {
				if (url.toString().startsWith('data:')) {
					return browser.get('/');
				}
			})
			.then(() => {
				element(by.id('menu-item-sign')).click();
				return element(by.id('sign-in-link')).isPresent();
			})
			.then(isSignInPresent => {
				if (isSignInPresent) {
					// No need to re-sign-in in if it is already signed and username is not specified (just continue with the current signed user)      
					const chosenUsername = (username ? username : this.defaultUsername);
					element(by.id('sign-in-link')).click();
					// The login page is a non-angular page.
					// Hence we need to use webdriver instead of protractor on the login page
					browser.driver.findElement(by.css('option[value="'+ chosenUsername +'"]')).click();
					browser.driver.findElement(by.css('.button')).click();
				}
			});
  }

  public signOut() {
    element(by.id('menu-item-sign')).click();
    element(by.id('sign-out-link')).click();
  }

}