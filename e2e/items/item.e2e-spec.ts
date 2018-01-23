import { ItemPage } from './item.po';
import { browser } from 'protractor';

import { TradeUtil } from '../util/trade-util';
import { SignInHelper } from '../sign-in-helper';
import { TradePage } from '../trades/trade.po';
import { ItemHelper } from './item-helper';


describe('Items', () => {
	const page: ItemPage = new ItemPage();
	const itemHelper: ItemHelper = new ItemHelper();
	const signInHelper: SignInHelper = new SignInHelper();
	const tradePage: TradePage = new TradePage();
	const tradeUtil: TradeUtil = new TradeUtil(tradePage);
  
	it('should create new item', () => {
    // Sign-in
		signInHelper.signIn();
		const tradeName: string = 'Greece';
		tradeUtil.createTrade(tradeName);
		itemHelper.createItem('Apple');
	});

	it('should update an existing item', () => {
    // Sign-in
		signInHelper.signIn();
		const tradeName: string = 'Hungary';
		tradeUtil.createTrade(tradeName);
		const itemName: string = 'Banana';
		itemHelper.createItem(itemName);

		browser.navigate().back();
		expect(page.elementItemRow(itemName)).toBeDefined();
		page.elementItemRow(itemName).click();
		expect(page.elementSaveItemButton()).toBeDefined();
		page.elementItemName().clear();
		page.elementItemName().sendKeys(itemName + 'Updated');
		page.elementSaveItemButton().click();
		expect(page.elementSavedMessage()).toBeDefined();
	});

});
