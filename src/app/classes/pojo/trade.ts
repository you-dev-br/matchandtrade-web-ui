export enum TradeState {
  SUBMITTING_ITEMS='SUBMITTING_ITEMS',
  MATCHING_ITEMS='MATCHING_ITEMS',
  GENERATE_RESULTS='GENERATE_RESULTS',
  GENERATING_RESULTS='GENERATING_RESULTS',
  RESULTS_GENERATED='RESULTS_GENERATED',
  CANCELED='CANCELED'
};

export class Trade {
  _href: string;
  description: string;
  tradeId: number = null;
  name: string = null;
  state: TradeState = null;
}
