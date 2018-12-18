import { Component, OnInit } from '@angular/core';
import { TradeService } from '../../service/trade.service';
import { Trade } from '../../class/pojo/trade';
import { NavigationService } from '../../service/navigation.service';
import { PageEvent } from '@angular/material';
import { Pagination } from '../../class/search/pagination';
import { SearchResult } from 'src/app/class/search/search-result';
import { LoadingAndErrorSupport } from 'src/app/class/util/loading-and-error-support';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [NavigationService]
})
export class ListComponent extends LoadingAndErrorSupport implements OnInit {
  pagination: Pagination = new Pagination(1, 25);
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
      this.errorMessage = e;
    } finally {
      this.loading = false;
    }
  }

  navigate(trade: Trade) {
    this.navigationService.navigate("trades/entries", trade.getHref());
  }

  onPageChange(pageEvent: PageEvent) {
    this.pagination.page.number = pageEvent.pageIndex + 1;
    this.pagination.page.size = pageEvent.pageSize;
    this.pagination.totalEntries = pageEvent.length;
    this.findAll();
  }
}
