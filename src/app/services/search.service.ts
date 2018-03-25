import { Injectable } from '@angular/core';

import { HttpService } from '../services/http.service';
import { SearchResult } from '../classes/search/search-result';
import { SearchCriteria, Operator, Matcher, Recipe } from '../classes/search/search-criteria';
import { TradeMembership } from '../classes/pojo/trade-membership';
import { Item } from '../classes/pojo/item';
import { ItemTransformer } from '../classes/transformers/item-transformer';
import { Pagination } from '../classes/search/pagination';
import { Page } from '../classes/search/page';
import { ServiceExceptionFactory } from '../classes/exceptions/service-exceptions';

@Injectable()
export class SearchService {

  private searchUrl = "/matchandtrade-web-api/v1/search";

  constructor(
    private httpService: HttpService
  ) { }

  searchItemsToMatch (tm: TradeMembership, page: Page): Promise<SearchResult<Item>> {
		let searchCriteria = new SearchCriteria();
		searchCriteria.recipe = Recipe.ITEMS;
		searchCriteria.addCriteria("Trade.tradeId", tm.tradeId, Operator.AND, Matcher.EQUALS);
		searchCriteria.addCriteria("TradeMembership.tradeMembershipId", tm.tradeMembershipId, Operator.AND, Matcher.NOT_EQUALS);
		const body = searchCriteria;
    return new Promise<SearchResult<Item>>( (resolve, reject) => {
      this.httpService
        .post(this.searchUrl, body, true, page)
        .then(v => {
          const itemTransformer = new ItemTransformer();
          resolve(itemTransformer.toSearchResult(v, page));
        })
        .catch(e => reject(ServiceExceptionFactory.makeException(e)));
    });
  }

	searchOfferingItems (tm: TradeMembership): Promise<SearchResult<Item>> {
		let searchCriteria = new SearchCriteria();
		searchCriteria.recipe = Recipe.ITEMS;
		searchCriteria.addCriteria("TradeMembership.tradeMembershipId", tm.tradeMembershipId, Operator.AND, Matcher.EQUALS);
		const body = searchCriteria;
    return new Promise<SearchResult<Item>>( (resolve, reject) => {
      this.httpService
        .post(this.searchUrl, body)
        .then(v => {
          const itemTransformer = new ItemTransformer();
          let items = itemTransformer.toPojos(v.json());
          let searchResult = new SearchResult<Item>(items, new Pagination(1, 3));
          resolve(searchResult);
        })
        .catch(e => reject(ServiceExceptionFactory.makeException(e)));
    });
  }  

}
