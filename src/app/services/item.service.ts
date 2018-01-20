import { Injectable } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { HttpService } from '../services/http.service';
import { Item } from '../classes/pojo/item';

@Injectable()
export class ItemService {

  constructor(
    private authenticationService: AuthenticationService,
    private httpService: HttpService
  ) { }


  // save(tradeMembership: TradeMembership): Promise<TradeMembership> {
  //   return new Promise( (resolve, reject) => {
  //     this.httpService
  //       .post('/api/rest/v1/trade-memberships/', tradeMembership)
  //       .then(v =>
  //         resolve(this.transformer.toPojo(v.json()))
  //       )
  //       .catch(e => reject(e));
  //   });
  // }

  save(item: Item, tradeMembershipHref: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.post(tradeMembershipHref + '/items/', item)
        .then(v => {
          resolve(v);
        })
        .catch(e => reject(e));
    });

  }

}
