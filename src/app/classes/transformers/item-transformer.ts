import { Response } from '@angular/http';

import { Page } from '../search/page';
import { SearchResult } from '../search/search-result';
import { Item } from '../pojo/item';
import { Transformer } from './transformer';    

export class ItemTransformer extends Transformer<Item> {

    public toPojo(json: any): Item {
        const result = new Item();
        Object.assign(result, json);
        result.links = this.buildLinks(json._links);
        return result;
    }

}
