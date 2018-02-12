import { Injectable } from '@angular/core';

import { Item } from '../classes/pojo/item';
import { WantItem } from '../classes/pojo/want-item';
import { HttpService } from '../services/http.service';

@Injectable()
export class WantItemService {

  constructor(
    private httpService: HttpService
  ) { }
  
  want(wantedItem: Item, offeringItem: Item, priority: number): Promise<WantItem> {
    const request = new WantItem(offeringItem.itemId, priority);
		return new Promise((resolve, reject) => {
				this.httpService.post(wantedItem._href + "/want-items", request)
					.then(v => {
            let result: WantItem = new WantItem(null, null);
            result = Object.assign(result, v.json);
            resolve(result)
          })
					.catch(e => reject(e));
      });
  }

}
