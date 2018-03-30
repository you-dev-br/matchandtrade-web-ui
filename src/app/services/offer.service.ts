import { Injectable } from '@angular/core';

import { Item } from '../classes/pojo/item';
import { OfferTransformer } from '../classes/transformers/offer-transformer';
import { HttpService } from '../services/http.service';
import { Offer } from '../classes/pojo/offer';
import { Page } from '../classes/search/page';
import { SearchResult } from '../classes/search/search-result';
import { ExceptionFactory } from '../classes/exceptions/exceptions';

@Injectable()
export class OfferService {

  offerTransformer = new OfferTransformer();

  constructor(private httpService: HttpService) { }
  
  offer(tradeMembershipHref:string, offeringItem: Item, wantedItem: Item): Promise<Offer> {
    const request = new Offer(offeringItem.itemId, wantedItem.itemId);
		return new Promise((resolve, reject) => {
				this.httpService.post(tradeMembershipHref + "/offers/", request)
					.then(v => {
            let result: Offer = new Offer(null, null);
            result = Object.assign(result, v.json());
            resolve(result)
          })
					.catch(e => reject(e));
      });
  }

  search(page: Page, tradeMembershipHref: string, wantedItemId: number): Promise<SearchResult<Offer>> {
    return new Promise<SearchResult<Offer>>((resolve, reject) => {
      this.httpService
        .get(tradeMembershipHref + '/offers?wantedItemId=' + wantedItemId, true, page)
        .then(v => resolve(this.offerTransformer.toSearchResult(v, page)))
        .catch(e => reject( ExceptionFactory.makeException(e) ));
    });
  }

  delete(tradeMembershipHref: string, offerId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.httpService
        .delete(tradeMembershipHref + '/offers/' + offerId)
        .then(v => resolve(true))
        .catch(e => reject(ExceptionFactory.makeException(e)));
    });
  }

}
