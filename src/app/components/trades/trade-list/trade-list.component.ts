import { Component } from '@angular/core';

import { Pagination } from '../../../classes/search/pagination';
import { TradeService } from '../../../services/trade.service';
import { Trade } from '../../../pojo/trade';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
  providers: [TradeService]
})
export class TradeListComponent {
  trades:Trade[];
  pagination: Pagination;
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(private tradeService: TradeService) {
    this.search();
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.pageNumber++;
      this.search();
    }
  }

  previousPage() {
    if (this.hasPreviousPage()) {
      this.pageNumber--;
      this.search();
    }
  }

  hasNextPage():boolean {
    if (this.pagination && this.pageNumber * this.pageSize < this.pagination.totalEntries ) {
      return true;
    } else {
      return false;
    }
  }

  hasPreviousPage():boolean {
    if (this.pagination && this.pageNumber > 1) {
      return true;
    } else {
      return false;
    }
  }

  private search(): void {
    let searchResult = this.tradeService.search(this.pageNumber, this.pageSize);
    this.trades = searchResult.results;
    this.pagination = searchResult.pagination;
  }
}
