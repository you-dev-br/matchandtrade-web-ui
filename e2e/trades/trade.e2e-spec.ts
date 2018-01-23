import { TradePage } from './trade.po';
import { browser } from 'protractor';

import { TradeUtil } from '../util/trade-util';
import { SignInHelper } from '../sign-in-helper';

describe('Trades', () => {
  let page: TradePage;
  let signInHelper: SignInHelper = new SignInHelper();
  
  beforeEach(() => {
    page = new TradePage();
  });
  
  it('should create new trade', () => {
    // Sign-in
    signInHelper.signIn();
    const tradeName = 'Argentina';

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

    page.elementTradeName().sendKeys('Updated');
    expect(page.elementSaveTradeButton()).toBeDefined();
    page.elementSaveTradeButton().click();
    expect(page.elementSavedMessage().getText()).toBe('Trade saved.');

    page.elementNavigationBarTrades().click();

    expect(page.elementTradeRow(tradeName + 'Updated').getText()).toBe(tradeName + 'Updated');
  });

  it('should update trade', () => {
    // Sign-in
    signInHelper.signIn();
    const tradeName = 'Brazil';
    
    // Create Trade
    const tradeUtil = new TradeUtil(page);
    tradeUtil.createTrade(tradeName);

    // Update Trade
    page.elementNavigationBarTrades().click();
    expect(page.elementTradeRow(tradeName)).toBeDefined();
    page.elementTradeRow(tradeName).click();
    page.elementTradeName().clear();
    page.elementTradeName().sendKeys(tradeName + 'Updated');
    expect(page.elementTradeState('Matching Items')).toBeDefined();
    page.elementTradeState('Matching Items').click();;
    expect(page.elementSaveTradeButton()).toBeDefined();
    page.elementSaveTradeButton().click();
    expect(page.elementSavedMessage().getText()).toBe('Trade saved.');
    page.elementNavigationBarTrades().click();
    expect(page.elementTradeRow(tradeName + 'Updated').getText()).toBe(tradeName + 'Updated');
  });

  it('should not update trade if has invalid data', () => {
    // Sign-in
    signInHelper.signIn();
    
    // Create Trade
    const tradeUtil = new TradeUtil(page);
    const previousTradeName = 'Canada';
    const currentTradeName = 'Denmark';
    tradeUtil.createTrade(previousTradeName);
    tradeUtil.createTrade(currentTradeName);

    // Update Trade
    page.elementNavigationBarTrades().click();
    expect(page.elementTradeRow(currentTradeName)).toBeDefined();
    page.elementTradeRow(currentTradeName).click();
    page.elementTradeName().clear();
    page.elementTradeName().sendKeys('01');
    expect(page.elementSaveTradeButton().isEnabled()).toBeFalsy();
    page.elementTradeName().clear();
    page.elementTradeName().sendKeys(previousTradeName);
    expect(page.elementSaveTradeButton().isEnabled()).toBeTruthy();
    page.elementSaveTradeButton().click();
    expect(page.elementMessageBody().getText()).toContain('must be unique');
  });

  it('nom-members should subscribe to trade', () => {
    // Sign-in with trade owner
    signInHelper.signIn();
    
    // Create Trade
    const tradeUtil = new TradeUtil(page);
    const tradeName = 'Egypt';
    tradeUtil.createTrade(tradeName);

    // Sign-in with a nom-member
    signInHelper.signIn();

    // Subscribe to Trade
    page.elementNavigationBarTrades().click();
    expect(page.elementTradeRow(tradeName)).toBeDefined();
    page.elementTradeRow(tradeName).click();
    page.elementSubscribeButton().click();
    expect(page.elementMessageBody().getText()).toContain('Subscribed.');
  });

  it('already members should not be able to subscribe to trade', () => {
    // Sign-in with trade owner
    signInHelper.signIn();
    
    // Create Trade
    const tradeUtil = new TradeUtil(page);
    const tradeName = 'Finland';
    tradeUtil.createTrade(tradeName);

    // Should not be able to subscribe to Trade
    page.elementNavigationBarTrades().click();
    expect(page.elementTradeRow(tradeName)).toBeDefined();
    page.elementTradeRow(tradeName).click();
    expect(page.elementSubscribeButton().isPresent()).toBeFalsy();
  });

});
