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

  constructor(private tradeService: TradeService) {
    this.pagination = new Pagination(1, 3, 0);
    this.search();
  }

  nextPage() {
      this.pagination.page.number++;
      this.search();
  }

  previousPage() {
      this.pagination.page.number--;
      this.search();
  }

  search(): void {
    let searchResult = this.tradeService.search(this.pagination.page)
      .then((v) => {
        console.log('trade-list.then()', v);
        this.trades = v.results;
        this.pagination = v.pagination;    
      }).catch((e) =>
        console.log('trade-list.catch',e)
      );
  }

}
