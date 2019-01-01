import { LinkSupport } from './link-support';
import { KeyValue } from '@angular/common';

export enum TradeState {
  CANCELED='CANCELED',
  GENERATE_RESULTS='GENERATE_RESULTS',
  GENERATING_RESULTS='GENERATING_RESULTS',
  MATCHING_ARTICLES='MATCHING_ARTICLES',
  RESULTS_GENERATED='RESULTS_GENERATED',
  SUBMITTING_ARTICLES='SUBMITTING_ARTICLES',
};

export class Trade extends LinkSupport {
  description: string;
  name: string;
  state: TradeState;
  tradeId: number;
}

export class TradeUtil {
  static toAvailableStates(state: TradeState): TradeState[] {
    const result: TradeState[] = [];
    result.push(TradeState.CANCELED);
    switch (state) {
      case TradeState.SUBMITTING_ARTICLES: {
        result.push(TradeState.SUBMITTING_ARTICLES);
        result.push(TradeState.MATCHING_ARTICLES);
        break;
      }
      case TradeState.MATCHING_ARTICLES: {
        result.push(TradeState.MATCHING_ARTICLES);
        result.push(TradeState.GENERATE_RESULTS);
        break;
      }
      case TradeState.GENERATE_RESULTS: {
        result.push(TradeState.GENERATE_RESULTS);
        break;
      }
      default: {
        result.push(TradeState.GENERATE_RESULTS);
        result.push(TradeState.MATCHING_ARTICLES);
        result.push(TradeState.RESULTS_GENERATED);
        result.push(TradeState.SUBMITTING_ARTICLES);	
        break;
      }
    }
    return result;
  }

  static toKeyValue(status: TradeState): KeyValue<TradeState, string> {
    switch (status) {
      case TradeState.CANCELED: {
        return {key: TradeState.CANCELED, value: 'Cancel'};
      }
      case TradeState.GENERATE_RESULTS: {
        return {key: TradeState.GENERATE_RESULTS, value: 'Generate Results'};
      }
      case TradeState.GENERATING_RESULTS: {
        return {key: TradeState.GENERATING_RESULTS, value: 'Generating Results'};
      }
      case TradeState.MATCHING_ARTICLES: {
        return {key: TradeState.MATCHING_ARTICLES, value: 'Match Articles'};
      }
      case TradeState.RESULTS_GENERATED: {
        return {key: TradeState.RESULTS_GENERATED, value: 'Results Generated'};
      }
      case TradeState.SUBMITTING_ARTICLES: {
        return {key: TradeState.SUBMITTING_ARTICLES, value: 'Submit Articles'};
      }
    }
  }
}