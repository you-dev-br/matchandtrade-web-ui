import { TradePage } from './trade.po';
import { browser } from 'protractor';

describe('matchandtrade-web-ui App', () => {
  let page: TradePage;

  beforeEach(() => {
    page = new TradePage();
  });

  it('should create new trade', () => {
    page.navigateToSignIn();
    page.signIn();
    page.navigateToTradeList();
    page.clickOnCreate();
    page.enterTradeName('Alpha');
    page.clickOnSaveTrade();
    page.navigateToTradeList();
    page.clickOnTrade('Alpha');
    page.enterTradeName('Beta');
    page.clickOnSaveTrade();
    page.navigateToTradeList();
    expect(page.tradeElement('AlphaBeta').getText()).toBe('AlphaBeta');
  });
});
