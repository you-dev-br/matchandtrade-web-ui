import { browser, by, element } from 'protractor';

export class TradePage {
  navigateToSignIn() {
    return browser.getCurrentUrl().then(v => {
      browser.driver.get(v + 'sign-in').then(v =>{
        // browser.driver.sleep(100);
      });
    });
  }

  signIn() {
    return element(by.cssContainingText('a', 'Sign-in with Google')).click();
  }

  navigateToTradeList() {
    return browser.get('/trades');
  }

  clickOnCreate() {
    return element(by.cssContainingText('button', 'Create')).click();
  }

  enterTradeName(text: string) {
    return element(by.id('trade-name')).sendKeys(text);
  }

  enterTradeState(text: string) {
    return element(by.cssContainingText('option', '')).click();
  }

  clickOnSaveTrade() {
    return element(by.className('button')).click();
  }

  clickOnTrade(tradeName: string) {
    return element(by.cssContainingText('.mt-table-row-clickable', tradeName)).click();
  }

  tradeElement(tradeName: string) {
    return element(by.cssContainingText('.mt-table-row-clickable', tradeName));
  }

}
