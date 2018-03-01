import { Injectable } from '@angular/core';

import { Item } from '../classes/pojo/item';
import { Offer } from '../classes/pojo/offer';
import { HttpService } from '../services/http.service';

@Injectable()
export class OfferService {

  constructor(
    private httpService: HttpService
  ) { }
  
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

}
