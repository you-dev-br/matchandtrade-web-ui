import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../services/http.service';
import { Pagination } from '../classes/search/pagination';
import { Page } from '../classes/search/page';
import { SearchResult } from '../classes/search/search-result';
import { Trade } from '../classes/pojo/trade';
import { TradeTransformer } from '../classes/transformers/trade-transformer';
import { User } from '../classes/pojo/user';

@Injectable()
export class UserService {

	private currentAuthenticatedUser: User;

	constructor(private httpService: HttpService) { }

	getAuthenticatedUser(): Promise<User> {
		if (this.currentAuthenticatedUser) {
			return new Promise<User>((resolve, reject) => {
				resolve(this.currentAuthenticatedUser);
			});
		} else {
			return new Promise<User>((resolve, reject) => {
				this.httpService
					.get('/matchandtrade-web-api/v1/authentications/')
					.then(v => {
						let result = new User();
						result.userId = v.json().userId;
						this.currentAuthenticatedUser = result;
						resolve(result);
					})
					.catch(e => reject(e));
			});
		}
	}

}
