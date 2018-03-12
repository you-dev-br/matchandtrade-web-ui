export enum TradeState {
  SUBMITTING_ITEMS='SUBMITTING_ITEMS',
  MATCHING_ITEMS='MATCHING_ITEMS',
	GENERATE_RESULTS='GENERATE_RESULTS',
	RESULTS_GENERATED='RESULTS_GENERATED',
  CLOSED='CLOSED'
};

export class Trade {
  _href: string;
  tradeId: number = null;
  name: string = null;
  state: TradeState = null;
}
