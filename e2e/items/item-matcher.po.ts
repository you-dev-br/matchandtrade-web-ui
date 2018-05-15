import { browser, by, element } from 'protractor';

export class ItemMatcherPage {

  elementIWantButton(itemName: string) {
		return element(by.cssContainingText('td', itemName)).all(by.cssContainingText('button', 'I Want'));
	}

	elementIWantItem(itemName: string) {
		return element(by.cssContainingText('td', itemName));
	}

	elementSaveButton() {
		return element(by.cssContainingText('button', 'Save'));
	}
}
