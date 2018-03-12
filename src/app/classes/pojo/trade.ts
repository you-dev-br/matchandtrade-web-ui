export enum TradeState {
  SUBMITTING_ITEMS='Submitting Items',
  MATCHING_ITEMS='Matching Items',
	GENERATE_RESULTS='Generate Results',
	RESULTS_GENERATED='Results Generated',
  CANCELED='Canceled'
};

export class Trade {
  _href: string;
  tradeId: number = null;
  name: string = null;
  state: TradeState = null;
}
