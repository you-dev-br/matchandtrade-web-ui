import { Response } from '@angular/http';

import { Page } from '../search/page';
import { SearchResult } from '../search/search-result';
import { Item } from '../pojo/item';
import { Transformer } from './transformer';    

export class ItemTransformer extends Transformer<Item> {

    public toPojo(json: any): Item {
        const result = new Item();
        result._href = this.extractHref(json._links);
        Object.assign(result, json);
        return result;
    }

}
