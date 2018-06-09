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
		const tradeName: string = 'Test - Should create new item ' + salt;
		tradeHelper.createTrade(tradeName);
		itemHelper.createItem('Apple');
	});

	it('should attach an image to a new item', () => {
		const tradeName: string = 'Test - Should attach an image to a new item ' + salt;
		tradeHelper.createTrade(tradeName);
		page.elementItemsButton().click();
		page.elementCreateButton().click();
		page.elementItemName().sendKeys('Apple');
		page.elementAddImagesInput().sendKeys(__dirname + '/item-image.png');
		page.elementSaveItemButton().click();
		expect(page.elementSavedMessage()).toBeDefined();
	});

	it('should update an existing item', () => {
		const tradeName: string = 'Test - Should update an existing item ' + salt;
		tradeHelper.createTrade(tradeName);
		const itemName: string = 'Apple ' + salt;
		itemHelper.createItem(itemName);

		expect(page.elementItemRow(itemName)).toBeDefined();
		page.elementItemRow(itemName).click();
		expect(page.elementSaveItemButton().isEnabled()).toBeFalsy();
		page.elementItemName().clear();
		page.elementItemName().sendKeys(itemName + ' Updated');
		page.elementSaveItemButton().click();
		expect(page.elementSavedMessage()).toBeDefined();
	});

});
