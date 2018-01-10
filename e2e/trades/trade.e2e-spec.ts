import { TradePage } from './trade.po';
import { browser } from 'protractor';

import { TradeUtil } from '../util/trade-util';
import { SignInUtil } from '../util/sign-in-util';

describe('matchandtrade-web-ui App', () => {
  let page: TradePage;
  let signInUtil: SignInUtil = new SignInUtil();
  
  beforeEach(() => {
    page = new TradePage();
  });
  
  it('should create new trade', () => {
    // Sign-in
    signInUtil.signIn();
    let tradeName = 'Alpha';

    // Create Trade
    page.elementNavigationBarTrades().click();
    expect(page.elementCreateTradeButton()).toBeDefined();
    page.elementCreateTradeButton().click();
    page.elementTradeName().sendKeys(tradeName);
    expect(page.elementSaveTradeButton()).toBeDefined();
    page.elementSaveTradeButton().click();
    expect(page.elementSavedMessage().getText()).toBe('Trade saved.');

    // Update Trade
    page.elementNavigationBarTrades().click();
    expect(page.elementTradeRow(tradeName)).toBeDefined();
    page.elementTradeRow(tradeName).click();

    page.elementTradeName().sendKeys("Updated");
    expect(page.elementSaveTradeButton()).toBeDefined();
    page.elementSaveTradeButton().click();
    expect(page.elementSavedMessage().getText()).toBe('Trade saved.');

    page.elementNavigationBarTrades().click();

    expect(page.elementTradeRow(tradeName + 'Updated').getText()).toBe(tradeName + 'Updated');
  });

  it('should update trade name', () => {
    // Sign-in
    signInUtil.signIn();
    let tradeName = 'Beta';
    
    // Create Trade
    let tradeUtil = new TradeUtil(page);
    tradeUtil.createTrade(tradeName);

    // Update Trade
    page.elementNavigationBarTrades().click();
    expect(page.elementTradeRow(tradeName)).toBeDefined();
    page.elementTradeRow(tradeName).click();
    page.elementTradeName().clear();
    page.elementTradeName().sendKeys(tradeName + 'Updated');
    expect(page.elementSaveTradeButton()).toBeDefined();
    page.elementSaveTradeButton().click();
    expect(page.elementSavedMessage().getText()).toBe('Trade saved.');
    page.elementNavigationBarTrades().click();
    expect(page.elementTradeRow(tradeName + 'Updated').getText()).toBe(tradeName + 'Updated');
  });

  it('should update trade state', () => {
    // Sign-in
    signInUtil.signIn();
    
    // Create Trade
    let tradeUtil = new TradeUtil(page);
    tradeUtil.createTrade('TestingState');

    // Update Trade
    page.elementNavigationBarTrades().click();
    expect(page.elementTradeRow('TestingState')).toBeDefined();
    page.elementTradeRow('TestingState').click();
    expect(page.elementTradeState('Matching Items')).toBeDefined();
    page.elementTradeState('Matching Items').click();;
    page.elementSaveTradeButton().click();
    expect(page.elementSavedMessage().getText()).toBe('Trade saved.');
  });

  it('should not update trade if has invalid data', () => {
    // Sign-in
    signInUtil.signIn();
    
    // Create Trade
    let tradeUtil = new TradeUtil(page);
    tradeUtil.createTrade('PreviousValidation');
    tradeUtil.createTrade('CurrentValidation');

    // Update Trade
    page.elementNavigationBarTrades().click();
    expect(page.elementTradeRow('CurrentValidation')).toBeDefined();
    page.elementTradeRow('CurrentValidation').click();
    page.elementTradeName().clear();
    page.elementTradeName().sendKeys('01');
    expect(page.elementSaveTradeButton().isEnabled()).toBeFalsy();
    page.elementTradeName().clear();
    page.elementTradeName().sendKeys('PreviousValidation');
    expect(page.elementSaveTradeButton().isEnabled()).toBeTruthy();
    page.elementSaveTradeButton().click();
    expect(page.elementMessageBody().getText()).toContain('must be unique');
  });

});
