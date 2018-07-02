import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../services/http.service';
import { Pagination } from '../classes/search/pagination';
import { Page } from '../classes/search/page';
import { SearchResult } from '../classes/search/search-result';
import { Trade } from '../classes/pojo/trade';
import { TradeResult } from '../classes/pojo/trade-result';
import { TradeTransformer } from '../classes/transformers/trade-transformer';
import { TradeResultTransformer } from '../classes/transformers/trade-result-transformer';
import { KeyValuePair } from '../classes/pojo/key-value-pair';

@Injectable()
export class TradeService {
  trades: Trade[] = new Array<Trade>();
  tradeTransformer = new TradeTransformer();
  tradeResultTransformer = new TradeResultTransformer();

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

	getResultsCsv(href: string): Promise<Blob> {
    const headers = new Array<KeyValuePair>();
    headers.push(new KeyValuePair("Content-type", "text/csv")); 
		return new Promise<Blob>((resolve, reject) => {
			this.httpService
				.get(href + '/results', true, undefined, undefined, headers)
				.then(v => {
					resolve(new Blob([v.arrayBuffer()], { type: 'text/csv' }));
				})
				.catch(e => reject(e));
		});
	}

  getResultsJson(href: string): Promise<TradeResult> {
		return new Promise<TradeResult>((resolve, reject) => {
			this.httpService
				.get(href + '/results')
				.then(v => {
					resolve(this.tradeResultTransformer.toPojo(v.json()));
				})
				.catch(e => reject(e));
		});
	}
	
  save(trade: Trade): Promise<Trade> {
    let result = new Promise<Trade>( (resolve, reject) => {
      if (trade.getHref()) {
        this.httpService
          .put(trade.getHref(), trade)
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
