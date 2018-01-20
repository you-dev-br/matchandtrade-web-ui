import { Injectable } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { HttpService } from '../services/http.service';
import { Item } from '../classes/pojo/item';
import { ItemTransformer } from '../classes/transformers/item-transformer';

@Injectable()
export class ItemService {

  itemTransformer: ItemTransformer = new ItemTransformer();

  constructor(
    private authenticationService: AuthenticationService,
    private httpService: HttpService
  ) { }

  save(item: Item, tradeMembershipHref: string): Promise<Item> {
    return new Promise((resolve, reject) => {
      this.httpService.post(tradeMembershipHref + '/items/', item)
        .then(v => resolve(this.itemTransformer.toPojo(v.json())))
        .catch(e => reject(e));
    });
  }

}
