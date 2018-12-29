import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, catchError, } from 'rxjs/operators';
import { HttpUtil } from '../class/common/http-util';
import { MembershipTransformer } from '../class/transformer/membeship-transformer';
import { Membership } from '../class/pojo/membership';
import { Page } from '../class/search/page';
import { SearchResult } from '../class/search/search-result';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  membershipTransformer: MembershipTransformer = new MembershipTransformer();

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient) { }

    
  async findByTradeId(tradeId: number): Promise<Membership> {
    const userId: number = await this.authenticationService.obtainUserId();
    return this.findByUserIdAndTradeId(userId, tradeId);
  }
  
  async findByUserIdAndTradeId(userId: number, tradeId: number): Promise<Membership> {
    const authorizationHeader = await this.authenticationService.obtainAuthorizationHeader();
    return this.http
      .get(`/matchandtrade-api/v1/memberships/?userId=${userId}&tradeId=${tradeId}`,
        { headers: authorizationHeader, observe: 'response' })
      .pipe(
        catchError(HttpUtil.httpErrorResponseHandler),
        map(response => this.findByUserIdAndTradeIdMap(response))
      )
      .toPromise();
  }

  private findByUserIdAndTradeIdMap(response: HttpResponse<any>): Membership {
    const searchResult: SearchResult<Membership> = this.membershipTransformer.toSearchResult(response, new Page(1, 1));
    if (searchResult.isEmpty()) {
      return null;
    } else {
      return searchResult.results[0];
    }
  }
}
