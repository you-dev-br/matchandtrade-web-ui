import { TradePage } from './trade.po';
import { browser } from 'protractor';

describe('matchandtrade-web-ui App', () => {
  let page: TradePage;

  beforeEach(() => {
    page = new TradePage();
  });

  it('should create new trade', () => {
    // Sign-in
    page.navigateToSignIn();
    expect(page.elementSignInLink()).toBeDefined();
    page.elementSignInLink().click();

    // Create Trade
    page.elementNavigationBarTrades().click();
    expect(page.elementCreateTradeButton()).toBeDefined();
    page.elementCreateTradeButton().click();
    page.elementTradeName().sendKeys('Alpha');
    expect(page.elementSaveTradeButton()).toBeDefined();
    page.elementSaveTradeButton().click();
    expect(page.elementSavedMessage().getText()).toBe('Trade saved.');

    // Update Trade
    page.elementNavigationBarTrades().click();
    expect(page.elementTradeRow('Alpha')).toBeDefined();
    page.elementTradeRow('Alpha').click();

    page.elementTradeName().sendKeys('Beta');
    expect(page.elementSaveTradeButton()).toBeDefined();
    page.elementSaveTradeButton().click();
    expect(page.elementSavedMessage().getText()).toBe('Trade saved.');

    page.elementNavigationBarTrades().click();

    expect(page.elementTradeRow('AlphaBeta').getText()).toBe('AlphaBeta');
  });

});
