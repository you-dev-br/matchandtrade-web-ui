import {} from 'jasmine';
import { ItemPage } from './item.po';

export class ItemHelper {

	private page: ItemPage = new ItemPage();

	public createItem(name: string):void {
		expect(this.page.elementItemsButton()).toBeDefined();
		this.page.elementItemsButton().click();
		expect(this.page.elementCreateButton()).toBeDefined();
		this.page.elementCreateButton().click();
		expect(this.page.elementSaveItemButton()).toBeDefined();
		this.page.elementItemName().sendKeys(name);
		this.page.elementSaveItemButton().click();
		expect(this.page.elementSavedMessage()).toBeDefined();
	}

}