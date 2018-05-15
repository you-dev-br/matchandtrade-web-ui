import { browser, by, element } from 'protractor';

export class TradeResultPage {

	elementTotalOfTradedItemsParagraph() {
    return element(by.cssContainingText('p', 'Total of Traded Items'));
	}

}
