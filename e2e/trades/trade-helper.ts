import { TradePage } from '../trades/trade.po';

export class TradeHelper {

  private page: TradePage = new TradePage();

  public createTrade(name: string) {
    this.page.elementNavigationBarTrades().click();
    this.page.elementCreateTradeButton().click();
    this.page.elementTradeName().sendKeys(name);
    this.page.elementSaveTradeButton().click();   
	}
	
}