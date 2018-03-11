import { Response } from '@angular/http';

import { Offer } from '../pojo/offer';
import { Page } from '../search/page';
import { SearchResult } from '../search/search-result';
import { Transformer } from './transformer';    

export class OfferTransformer extends Transformer<Offer> {

    public toPojo(json: any): Offer {
        const href = this.extractHref(json._links);
        const offerId = json.offerId;
        const offeredItemId = json.offeredItemId;
        const wantedItemId = json.wantedItemId;
        return new Offer(offeredItemId, wantedItemId, offerId);
    }

}
