export enum TradeState {
  SUBMITTING_ITEMS='SUBMITTING_ITEMS',
  MATCHING_ITEMS='MATCHING_ITEMS',
  GENERATING_TRADES='GENERATING_TRADES',
  CLOSED='CLOSED'
};

export class Trade {
  _href: string;
  tradeId: number = null;
  name: string = null;
  state: TradeState = null;
}



