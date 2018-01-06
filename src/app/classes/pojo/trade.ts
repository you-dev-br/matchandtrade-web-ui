export enum TradeState {
  SUBMITTING_ITEMS='Submitting Items',
  MATCHING_ITEMS='Matching Items',
  GENERATING_TRADES='Generating Trades',
  CLOSED='Closed'
};

export class Trade {
  _href: string;
  tradeId: number = null;
  name: string = null;
  state: TradeState = null;
}



