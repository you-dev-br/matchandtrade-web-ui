import { Component } from '@angular/core';

import { Pagination } from '../../../classes/search/pagination';
import { TradeService } from '../../../services/trade.service';
import { Trade } from '../../../classes/pojo/trade';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
  providers: [TradeService]
})
export class TradeListComponent {
  trades: Trade[];
  pagination: Pagination;
  isLoading: boolean = true;

  constructor(private tradeService: TradeService) {
    this.pagination = new Pagination(1, 3, 0);
    this.search();
  }

  nextPage() {
      this.pagination.page.number++;
      this.isLoading = true;
      this.search();
  }

  previousPage() {
      this.pagination.page.number--;
      this.isLoading = true;
      this.search();
  }

  search(): void {
    this.tradeService.search(this.pagination.page)
      .then((v) => {
        this.trades = v.results;
        this.pagination = v.pagination;    
        this.isLoading = false;
      }).catch((e) =>
        this.isLoading = false
      );
  }

}
