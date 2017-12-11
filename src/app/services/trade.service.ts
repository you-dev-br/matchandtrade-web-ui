import { Injectable } from '@angular/core';

import { Trade } from '../pojo/trade';

@Injectable()
export class TradeService {

  constructor() { }

  getTrades(): Trade[] {
    let t1: Trade = new Trade();
    t1.tradeId = 1;
    t1.name = "First trade";

    let t2: Trade = new Trade();
    t2.tradeId = 2;
    t2.name = "Second trade";

    let t3: Trade = new Trade();
    t3.tradeId = 3;
    t3.name = "Third trade";

    let t4: Trade = new Trade();
    t4.tradeId = 3;
    t4.name = "Fourth trade";

    let t5: Trade = new Trade();
    t5.tradeId = 3;
    t5.name = "Fifth trade";

    let result = new Array<Trade>();
    result.push(t1);
    result.push(t2);
    result.push(t3);
    result.push(t4);
    result.push(t5);

    return result;
  }

}
