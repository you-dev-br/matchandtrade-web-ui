import { Component, OnInit } from '@angular/core';

import { LoadingAndMessageBannerSupport } from 'src/app/class/common/loading-and-message-banner-support';
import { NavigationService } from '../../service/navigation.service';
import { PageEvent } from '@angular/material';
import { Pagination } from '../../class/search/pagination';
import { SearchResult } from 'src/app/class/search/search-result';
import { TradeService } from '../../service/trade.service';
import { Trade } from '../../class/pojo/trade';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
  providers: [NavigationService]
})
export class TradeListComponent extends LoadingAndMessageBannerSupport implements OnInit {
  pagination: Pagination = new Pagination(1, 15);
  trades: Trade[] = [];

  constructor(
      private navigationService: NavigationService,
      private tradeService: TradeService) {
    super()
  }

  ngOnInit() {
    this.findAll();
  }
  
  private async findAll() {
    this.loading = true;
    try {
      const searchResult: SearchResult<Trade> = await this.tradeService.findAll(this.pagination.page);
      this.trades = searchResult.results;
      this.pagination = searchResult.pagination;
    } catch (e) {
      this.showErrorMessage(e);
    } finally {
      this.loading = false;
    }
  }

  navigate(trade?: Trade) {
    const href = trade ? trade.getSelfHref() : null;
    this.navigationService.navigate("trades/entries", {tradeHref: href});
  }

  onPageChange(pageEvent: PageEvent) {
    this.pagination.page.number = pageEvent.pageIndex + 1;
    this.pagination.page.size = pageEvent.pageSize;
    this.pagination.totalEntries = pageEvent.length;
    this.findAll();
  }
}
