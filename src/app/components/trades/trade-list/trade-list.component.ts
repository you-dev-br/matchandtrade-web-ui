import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { Pagination } from '../../../classes/search/pagination';
import { TradeService } from '../../../services/trade.service';
import { Trade } from '../../../classes/pojo/trade';
import { Erratum } from '../../../classes/pojo/erratum';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
  providers: [TradeService]
})
export class TradeListComponent {
  errata = new Array<Erratum>();
  trades: Trade[];
  pagination: Pagination;
  loading: boolean = true;

  constructor(private router: Router, private tradeService: TradeService) {
    this.pagination = new Pagination(1, 10, 0);
    this.search();
  }

  createTrade() {
    this.router.navigate(['trades-create']);
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
    this.errata.length = 0;
    this.tradeService.search(this.pagination.page)
      .then((v) => {
        this.trades = v.results;
        this.pagination = v.pagination;
        this.loading = false;
      }).catch((e) => {
        this.loading = false;
        if (e instanceof Response && e.status != 404) {
          this.errata.push(new Erratum(e));
        }
      });
  }

}
