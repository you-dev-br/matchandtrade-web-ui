import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Message} from '../../components/message/message';
import { NavigationService } from '../../services/navigation.service';
import { TradeResult, TradedItem } from '../../classes/pojo/trade-result';
import { TradeService } from '../../services/trade.service';
import { UserService } from '../../services/user.service';
import { Trade } from '../../classes/pojo/trade';

@Component({
  selector: 'app-trade-result',
  templateUrl: './trade-result.component.html',
  styleUrls: ['./trade-result.component.scss'],
  providers: [TradeService, UserService]
})
export class TradeResultComponent implements OnInit {
  private loading: boolean = true;
  private message: Message = new Message();
  private trade: Trade;
  private tradedItems: Array<TradedItem>;
  private tradeHref: string;
  private tradeResult: TradeResult;

  constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private tradeService: TradeService,
    private userService: UserService) { }

  ngOnInit() {
    this.tradeHref = this.navigationService.obtainData(this.route).tradeHref;
    this.tradeService.getResultsJson(this.tradeHref)
      .then(v => {
        this.tradeResult = v;
        this.tradedItems = v.tradedItems;
      })
      .then(() => {
        this.tradeService.get(this.tradeHref).then(v => this.trade = v);
      })
      .catch(e => this.message.setErrorItems(e))
      .then(() => {
        this.loading = false;
      });
  }

  displayMyEntries():void {
    this.userService.getAuthenticatedUser().then(u => {
      const tradedItemsForCurrentUser: Array<TradedItem> = this.tradedItems
        .filter(v => {
          return (v.userId == u.userId ? true : false);
        });
        this.tradeResult.tradedItems = tradedItemsForCurrentUser;
    }).catch(e => this.message.setErrorItems(e));
  }

  displayAllEntries():void {
    this.tradeResult.tradedItems = this.tradedItems;
    this.tradedItems.forEach(v => {
      this.tradeResult.tradedItems.push(v);
    });
  }

  download():void {
		this.tradeService.getResultsCsv(this.tradeHref)
			.then(v => {
				// TODO make this a utility method
				const downloadUrl = window.URL.createObjectURL(v);
				const link = document.createElement('a');
				link.href = window.URL.createObjectURL(v);
				const tradeNameAsAlphanumericCharactersOnly = this.trade.name.replace(/[\W_]+/g," ");
				link.download = tradeNameAsAlphanumericCharactersOnly + '[' + this.trade.tradeId + '].csv'  ;
				link.click();
			})
    	.catch(e => this.message.setErrorItems(e));
  }

  navigateBack() {
    this.navigationService.back();
  }

}
