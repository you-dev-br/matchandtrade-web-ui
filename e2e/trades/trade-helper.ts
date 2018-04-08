import { TradePage } from '../trades/trade.po';
import { SignInHelper } from '../sign-in-helper';

export class TradeHelper {

  private page: TradePage = new TradePage();
	private signInHelper: SignInHelper = new SignInHelper();

  public createTrade(name: string) {
    this.page.elementNavigationBarTrades().click();
    this.page.elementCreateTradeButton().click();
    this.page.elementTradeName().sendKeys(name);
    this.page.elementSaveTradeButton().click();   
  }
  
  public subscribeToTrade(tradeName: string) {    
    // Subscribe to Trade
    this.page.elementNavigationBarTrades().click();
    this.page.elementTradeRow(tradeName).click();
    this.page.elementSubscribeButton().click();
  }
	
}