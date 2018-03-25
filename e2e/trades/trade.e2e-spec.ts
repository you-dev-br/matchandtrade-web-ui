import { TradePage } from './trade.po';
import { browser } from 'protractor';

import { TradeHelper } from './trade-helper';
import { SignInHelper } from '../sign-in-helper';

describe('Trades', () => {
	const page: TradePage = new TradePage();
	const signInHelper: SignInHelper = new SignInHelper();
  const tradeHelper: TradeHelper = new TradeHelper();
  const salt: string = (new Date().getTime()/1000000).toFixed(6).substring(8);
  
  beforeAll(() => {
    signInHelper.signIn();
  });
 
  it('should create new trade', () => {
    const tradeName = 'Argentina' + salt;

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
    const tradeName = 'Brazil' + salt;
    
    // Create Trade
    tradeHelper.createTrade(tradeName);

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
    // Create Trade
    const previousTradeName = 'Canada' + salt;
    const currentTradeName = 'Denmark' + salt;
    tradeHelper.createTrade(previousTradeName);
    tradeHelper.createTrade(currentTradeName);

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
    // Create Trade
    const tradeName = 'Egypt' + salt;
    tradeHelper.createTrade(tradeName);

    // Sign-in with trade owner
    signInHelper.signIn('bob');
    
    // Subscribe to Trade
    page.elementNavigationBarTrades().click();
    expect(page.elementTradeRow(tradeName)).toBeDefined();
    page.elementTradeRow(tradeName).click();
    page.elementSubscribeButton().click();
    expect(page.elementMessageBody().getText()).toContain('Subscribed.');
  });

  it('already members should not be able to subscribe to trade', () => {
    // Create Trade
    const tradeName = 'Finland' + salt;
    tradeHelper.createTrade(tradeName);

    // Should not be able to subscribe to Trade
    page.elementNavigationBarTrades().click();
    expect(page.elementTradeRow(tradeName)).toBeDefined();
    page.elementTradeRow(tradeName).click();
    expect(page.elementSubscribeButton().isPresent()).toBeFalsy();
  });

});
