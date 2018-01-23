import { ItemPage } from './item.po';
import { browser } from 'protractor';

import { TradeHelper } from '../trades/trade-helper';
import { SignInHelper } from '../sign-in-helper';
import { TradePage } from '../trades/trade.po';
import { ItemHelper } from './item-helper';


describe('Items', () => {
	const page: ItemPage = new ItemPage();
	const itemHelper: ItemHelper = new ItemHelper();
	const signInHelper: SignInHelper = new SignInHelper();
	const tradePage: TradePage = new TradePage();
	const tradeHelper: TradeHelper = new TradeHelper();
  
	it('should create new item', () => {
    // Sign-in
		signInHelper.signIn();
		const tradeName: string = 'Greece';
		tradeHelper.createTrade(tradeName);
		itemHelper.createItem('Apple');
	});

	it('should update an existing item', () => {
    // Sign-in
		signInHelper.signIn();
		const tradeName: string = 'Hungary';
		tradeHelper.createTrade(tradeName);
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
