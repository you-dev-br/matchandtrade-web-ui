import { Response } from '@angular/http';

import { Page } from '../search/page';
import { SearchResult } from '../search/search-result';
import { Trade, TradeState } from '../pojo/trade';
import { Transformer } from './transformer';

export class TradeTransformer extends Transformer<Trade> {

    public toPojo(json: any): Trade {
        const result = new Trade();
        result._href = this.extractHref(json._links);
        result.description = json.description;
        result.name = json.name;
        result.tradeId = json.tradeId;
        result.state = json.state;
        return result;
    }

    public toStateText(state: string): string {
        switch(state) {
            case TradeState.CANCELED: {
                return 'Canceled'
            }
            case TradeState.GENERATE_RESULTS: {
                return 'Generate Results'
            }
            case TradeState.MATCHING_ITEMS: {
                return 'Matching Items'
            }
            case TradeState.RESULTS_GENERATED: {
                return 'Results Generated'
            }
            case TradeState.SUBMITTING_ITEMS: {
                return 'Submitting Items'
            }
            case TradeState.GENERATING_RESULTS: {
                return 'Generating Results'
            }
        }
        return null;
    }

}
