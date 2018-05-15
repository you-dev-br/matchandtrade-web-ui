import { ItemPage } from './item.po';
import { browser, by, element } from 'protractor';

import { TradeHelper } from '../trades/trade-helper';
import { SignInHelper } from '../sign-in-helper';
import { TradePage } from '../trades/trade.po';
import { TradeResultPage } from '../trades/trade-result.po';
import { ItemHelper } from './item-helper';
import { ItemMatcherPage } from './item-matcher.po';


describe('Item Matching', () => {
	const page: ItemPage = new ItemPage();
	const itemHelper: ItemHelper = new ItemHelper();
	const itemMatcherPage = new ItemMatcherPage();
	const signInHelper: SignInHelper = new SignInHelper();
	const tradePage: TradePage = new TradePage();
	const tradeResultPage: TradeResultPage = new TradeResultPage();
	const tradeHelper: TradeHelper = new TradeHelper();
  const salt: string = (new Date().getTime()/1000000).toFixed(6).substring(8);

	beforeAll(() => {
		signInHelper.signIn('alice');
  });

	it('should create trade with three items', () => {
		const tradeName: string = 'Test - Item matching ' + salt;
		tradeHelper.createTrade(tradeName);
		itemHelper.createItem('Apple');
		tradeHelper.navigateToTrade(tradeName);
		itemHelper.createItem('Blueberry');
		tradeHelper.navigateToTrade(tradeName);
		itemHelper.createItem('Cantaloupe');
		signInHelper.signOut();

		signInHelper.signIn('bob');
		tradeHelper.navigateToTrade(tradeName);
		tradePage.elementSubscribeButton().click();
		itemHelper.createItem('Durian');
		tradeHelper.navigateToTrade(tradeName);
		itemHelper.createItem('Elderberry');
		signInHelper.signOut();

		signInHelper.signIn('alice');
		tradeHelper.navigateToTrade(tradeName);
		tradePage.elementTradeState('Matching Items').click();
		tradePage.elementSaveTradeButton().click();
		tradePage.elementMatchingItemsButton().click();
		itemMatcherPage.elementIWantButton('Durian').click();
		itemMatcherPage.elementIWantItem('Apple').click();
		itemMatcherPage.elementSaveButton().click();
		signInHelper.signOut();

		signInHelper.signIn('bob');
		tradeHelper.navigateToTrade(tradeName);
		tradePage.elementMatchingItemsButton().click();
		itemMatcherPage.elementIWantButton('Apple').click();
		itemMatcherPage.elementIWantItem('Durian').click();
		itemMatcherPage.elementSaveButton().click();
		signInHelper.signOut();

		signInHelper.signIn('alice');
		tradeHelper.navigateToTrade(tradeName);
		tradePage.elementTradeState('Generate Results').click();
		tradePage.elementSaveTradeButton().click();
		tradeHelper.navigateToTrade(tradeName);
		tradePage.elementResultsButton().click();
		expect(tradeResultPage.elementTotalOfTradedItemsParagraph().getText()).toContain('2');
	});

});
