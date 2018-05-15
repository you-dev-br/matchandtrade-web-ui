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
  
	public navigateToTrade(tradeName: string) {    
    this.page.elementNavigationBarTrades().click();
    this.page.elementTradeRow(tradeName).click();
	}

	public save() {
		this.page.elementSaveTradeButton().click();
	}
	
}