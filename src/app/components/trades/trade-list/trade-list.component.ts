import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { Pagination } from '../../../classes/search/pagination';
import { TradeService } from '../../../services/trade.service';
import { Trade } from '../../../classes/pojo/trade';
import { RouteAction } from '../../../classes/route/route-action';
import { Message } from '../../message/message';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
  providers: [TradeService]
})
export class TradeListComponent {
  message: Message = new Message();
  trades: Trade[];
  pagination: Pagination;
  loading: boolean = true;

  constructor(private router: Router, private tradeService: TradeService) {
    this.pagination = new Pagination(1, 10, 0);
    this.search();
  }

  createTrade() {
    this.router.navigate(['trades/' + RouteAction.CREATE]);
  }

  navigateToTrade(trade: Trade) {
    this.router.navigate(['trades/' + RouteAction.VIEW, {href: trade._href}]);
  }

  nextPage() {
      this.pagination.page.number++;
      this.loading = true;
      this.search();
  }

  previousPage() {
      this.pagination.page.number--;
      this.loading = true;
      this.search();
  }

  search(): void {
    this.tradeService.search(this.pagination.page)
      .then((v) => {
        this.trades = v.results;
        this.pagination = v.pagination;
        this.loading = false;
      }).catch((e) => {
        this.loading = false;
        if (e.status != 404) {
          this.message.setErrorItems(e);
        }
      });
  }

}
