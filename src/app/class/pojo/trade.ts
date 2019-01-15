import { LinkSupport } from './link-support';
import { KeyValue } from '@angular/common';

/*
* State for a Trade.
* Important: this is an ordered enumeration, be mindful when changing the order.
* See: compareStates()
*/
export enum TradeState {
  SUBMITTING_ARTICLES='SUBMITTING_ARTICLES',
  MATCHING_ARTICLES='MATCHING_ARTICLES',
  GENERATE_RESULTS='GENERATE_RESULTS',
  GENERATING_RESULTS='GENERATING_RESULTS',
  RESULTS_GENERATED='RESULTS_GENERATED',
  CANCELED='CANCELED',
};

export class Trade extends LinkSupport {
  description: string;
  name: string;
  state: TradeState;
  tradeId: number;
}

export class TradeUtil {
  static compareStates(a: TradeState, b: TradeState): number {
    return Object.keys(TradeState).indexOf(a) - Object.keys(TradeState).indexOf(b);
  }
  
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
        result.push(TradeState.SUBMITTING_ARTICLES);
        result.push(TradeState.MATCHING_ARTICLES);
        result.push(TradeState.GENERATE_RESULTS);
        break;
      }
      case TradeState.GENERATE_RESULTS: {
        result.push(TradeState.GENERATE_RESULTS);
        break;
      }
      case TradeState.GENERATING_RESULTS: {
        result.push(TradeState.GENERATING_RESULTS);
        break;
      }
      case TradeState.RESULTS_GENERATED: {
        result.push(TradeState.RESULTS_GENERATED);
        break;
      }
      default: {
        result.push(TradeState.GENERATE_RESULTS);
        result.push(TradeState.MATCHING_ARTICLES);
        result.push(TradeState.SUBMITTING_ARTICLES);	
        break;
      }
    }
    return result;
  }

  static toAvailableStatesKeyValue(state: TradeState): KeyValue<TradeState, string>[] {
    const result: KeyValue<TradeState, string>[] = [];
    const states: TradeState[] = TradeUtil.toAvailableStates(state);
    for (let state of states) {
      const stateAsKeyValue = TradeUtil.toKeyValue(state);
      result.push(stateAsKeyValue);
    }
    return result;
  }

  static toKeyValue(state: TradeState): KeyValue<TradeState, string> {
    switch (state) {
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