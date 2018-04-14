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
import { UserTransformer } from '../classes/transformers/user-transformer';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {

	private currentAuthenticatedUser: User;
	private userTransformer: UserTransformer = new UserTransformer();

	constructor(private httpService: HttpService) { }

	getAuthenticatedUser(): Promise<User> {
		if (this.currentAuthenticatedUser) {
			return new Promise<User>((resolve, reject) => {
				resolve(this.currentAuthenticatedUser);
			});
		} else {
			return new Promise<User>((resolve, reject) => {
				this.httpService.get('/matchandtrade-web-api/v1/authentications/')
					.then(v => this.get(v.json().userId))
					.then(u => resolve(u))
					.catch(e => reject(e));
			});
		}
	}

	get(userId: number): Promise<User> {
		return new Promise<User>((resolve, reject) => {
			this.httpService
				.get('/matchandtrade-web-api/v1/users/' + userId)
				.then(v => resolve(this.userTransformer.toPojo(v.json())))
				.catch(e => reject(e));
		});
	}

	save(user: User): Promise<User> {
		return new Promise<User>((resolve, reject) => {
			this.httpService
				.put('/matchandtrade-web-api/v1/users/' + user.userId, user)
				.then(v => resolve(this.userTransformer.toPojo(v.json())))
				.catch(e => reject(e));
		});
	}

}
