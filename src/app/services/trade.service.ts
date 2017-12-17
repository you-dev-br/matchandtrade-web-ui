import { Injectable } from '@angular/core';

import { Trade } from '../classes/pojo/trade';
import { SearchResult } from '../classes/search/search-result';
import { Pagination } from '../classes/search/pagination';

@Injectable()
export class TradeService {
  trades: Trade[];

  constructor() {
    this.trades = new Array<Trade>();
    for (let i = 0; i < 37; i++) {
      this.trades.push(this.newTrade(i+1));
    }
  }

  get(tradeId: number): Trade {
    let result: Trade = new Trade();
    result.name = "Trade number " + tradeId;
    result.tradeId = tradeId;
    return result;
  }

  search(pageNumber: number, pageSize: number, name?: string): SearchResult<Trade> {
    let tradesForCurrentPage = new Array<Trade>();
    for(let i=(pageNumber * pageSize) - pageSize; i < pageSize * pageNumber; i++) {
      if (this.trades[i]) {
        tradesForCurrentPage.push(this.trades[i]);
      }
    }
    return new SearchResult(tradesForCurrentPage, new Pagination(pageNumber, pageSize, this.trades.length));
  }

  private newTrade(lastTradeId: number): Trade {
    let result: Trade = new Trade();
    result.tradeId = lastTradeId;
    result.name = "Trade number " + lastTradeId;
    return result;
  }

}
