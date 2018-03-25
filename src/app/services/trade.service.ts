import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../services/http.service';
import { Pagination } from '../classes/search/pagination';
import { Page } from '../classes/search/page';
import { SearchResult } from '../classes/search/search-result';
import { Trade } from '../classes/pojo/trade';
import { TradeTransformer } from '../classes/transformers/trade-transformer';

@Injectable()
export class TradeService {
  trades: Trade[] = new Array<Trade>();
  tradeTransformer = new TradeTransformer();

  constructor(
    private httpService: HttpService
  ) { }

  get(href: string): Promise<Trade> {
    return new Promise<Trade>( (resolve, reject) => {
      this.httpService
        .get(href)
        .then(v => resolve(this.tradeTransformer.toPojo(v.json())))
        .catch(e => reject(e));
    });
  }

	getResults(href: string): Promise<Blob> {
		return new Promise<Blob>((resolve, reject) => {
			this.httpService
				.get(href + '/results')
				.then(v => {
					resolve(new Blob([v.arrayBuffer()], { type: 'text/csv' }));
				})
				.catch(e => reject(e));
		});
	}
	
  save(trade: Trade): Promise<Trade> {
    let result = new Promise<Trade>( (resolve, reject) => {
      if (trade._href) {
        this.httpService
          .put(trade._href, trade)
          .then(v => resolve(this.tradeTransformer.toPojo(v.json())))
          .catch(e => reject(e));
      } else {
        this.httpService
          .post('/matchandtrade-web-api/v1/trades/', trade)
          .then(v => resolve(this.tradeTransformer.toPojo(v.json())))
          .catch(e => reject(e));
      }
    });
    return result;
  }

  search(page: Page, name?: string): Promise<SearchResult<Trade>> {
    return new Promise<SearchResult<Trade>>( (resolve, reject) => {
      this.httpService
        .get('/matchandtrade-web-api/v1/trades', false, page)
        .then(v => resolve(this.tradeTransformer.toSearchResult(v, page)))
        .catch(e => reject(e));
    });
  }

}
