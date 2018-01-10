import { Response } from '@angular/http';

import { Authentication } from '../pojo/authentication';
import { Page } from '../search/page';
import { SearchResult } from '../search/search-result';
import { Trade } from '../pojo/trade';
import { Transformer } from './transformer';
    

export class AuthenticationTransformer extends Transformer<Authentication> {

    public toPojo(json: any): Authentication {
        let result = new Authentication();
        result.authorizationHeader = json.authenticationHeader;
        return result;
    }

    public toPojos(list: any): Array<Authentication> {
        throw new Error('AuthenticationTransformer.toPojos() has not been implemented.');
    }

}
