import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';
import { Trade } from '../class/pojo/trade';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TradeTransformer } from '../class/transformer/trade-transformer';
import { Page } from '../class/search/page';
import { SearchResult } from '../class/search/search-result';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
	tradeTransformer: TradeTransformer = new TradeTransformer();

	constructor(
		private http: HttpClient) {}

	private buildTrade(name: string, desc: string): Trade {
		const result = new Trade();
		result.tradeId = 1;
		result.name = name;
		result.description = desc;
		return result;
	}

	find(tradeId: number): Trade {
		return this.buildTrade('Board games in Toronto - Summer 2018', 'Location: 401 Games\nSubmission Starts: 10/10/2018\nSubmission Ends: 20/10/2018');
	}

	findAll(page: Page): Promise<SearchResult<Trade>> {
		
		return this.http
			.get(this.findAllBuildUrl(page), {observe: 'response'})
			.pipe(map(response => this.findAllMapResponse(response, page)))
			.toPromise();
	}

	private findAllBuildUrl(page: Page): string {
		let result = '/matchandtrade-api/v1/trades';
		if (page) {
			result += `?_pageNumber=${page.number}&_pageSize=${page.size}`;
		}
		return result;
	}

	private findAllMapResponse(response: HttpResponse<any>, page: Page) {
		if (response.status != 200) {
			throw new Error(`Unable to GET trades. HttpStatus: ${response.status}`);
		}
		return this.tradeTransformer.toSearchResult(response, page);
	}
}
