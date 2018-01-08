import { browser, by, element } from 'protractor';

export class TradePage {
  navigateToSignIn() {
    return browser.get('/sign-in');
  }

  elementSignInLink() {
    return element(by.cssContainingText('a', 'Sign-in with Google'));
  }

  elementNavigationBarTrades() {
    return element(by.cssContainingText('.router-link', 'Trades'));
  }

  elementCreateTradeButton() {
    return element(by.cssContainingText('button', 'Create'));
  }

  elementTradeName() {
    return element(by.id('trade-name'));
  }

  enterTradeState(text: string) {
    return element(by.cssContainingText('option', '')).click();
  }

  elementSaveTradeButton() {
    return element(by.cssContainingText('button', 'Save'));
  }

  elementSavedMessage() {
    return element(by.cssContainingText('.message-body', 'Trade saved.'));
  }

  elementTradeRow(tradeName: string) {
    return element(by.cssContainingText('.mt-table-row-clickable', tradeName));
  }

}
