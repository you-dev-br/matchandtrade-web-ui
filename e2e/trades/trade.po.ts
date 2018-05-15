import { browser, by, element } from 'protractor';

export class TradePage {

  elementNavigationBarTrades() {
    return element(by.id('menu-item-trades'));
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
    return element(by.cssContainingText('tr', tradeName));
  }

  elementTradeState(state: string) {
    return element(by.cssContainingText('option', state));
  }

  elementSubscribeButton() {
    return element(by.cssContainingText('button', 'Subscribe'));
	}
	
  elementMatchingItemsButton() {
    return element(by.cssContainingText('button', 'Match Items'));
	}

	elementResultsButton() {
    return element(by.cssContainingText('button', 'Results'));
	}

}
