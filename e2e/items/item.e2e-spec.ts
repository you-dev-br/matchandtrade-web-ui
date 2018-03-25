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
  const salt: string = (new Date().getTime()/1000000).toFixed(6).substring(8);

	beforeAll(() => {
    signInHelper.signIn('alice');
  });


	it('should create new item', () => {
		const tradeName: string = 'Greece' + salt;
		tradeHelper.createTrade(tradeName);
		itemHelper.createItem('Apple');
	});

	it('should update an existing item', () => {
		const tradeName: string = 'Hungary' + salt;
		tradeHelper.createTrade(tradeName);
		const itemName: string = 'Banana' + salt;
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
