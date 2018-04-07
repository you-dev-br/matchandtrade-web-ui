import { browser, by, element } from 'protractor';

export class TradePage {

  elementNavigationBarTrades() {
    return element(by.id('navbar-trades'));
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

  elementMessageBody() {
    return element(by.className('message-body'));
  }

  elementTradeRow(tradeName: string) {
    return element(by.cssContainingText('.mt-table-row-clickable', tradeName));
  }

  elementTradeState(state: string) {
    return element(by.cssContainingText('option', state));
  }

  elementSubscribeButton() {
    return element(by.cssContainingText('button', 'Subscribe'));
  }

}
