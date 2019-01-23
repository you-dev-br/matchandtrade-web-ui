import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map, catchError, } from 'rxjs/operators';

import { Article } from '../class/pojo/article';
import { ArticleTransformer } from '../class/transformer/article-transformer';
import { AuthenticationService } from './authentication.service';
import { HttpUtil } from '../class/common/http-util';
import { Page } from '../class/search/page';
import { SearchResult } from '../class/search/search-result';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articleTransformer: ArticleTransformer = new ArticleTransformer();

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient) { }

  private buildSaveRequest(authorizationHeader: HttpHeaders, article: Article): HttpRequest<Article> {
    let httpMethod = article.getSelfHref() ? 'PUT' : 'POST';
    let url = article.getSelfHref() ? article.getSelfHref() : '/matchandtrade-api/v1/articles/';
    return new HttpRequest<Article>(httpMethod, url, article, {headers: authorizationHeader});
  }
  
  findAll(page: Page): Promise<SearchResult<Article>> {
    return this.http
      .get(this.findAllBuildUrl(page), { observe: 'response' })
      .pipe(
        catchError(HttpUtil.httpErrorResponseHandler),
        map(response => this.articleTransformer.toSearchResult(response, page))
      )
      .toPromise();
  }

  // TODO: Could this become a utility method?
  async find(href: string): Promise<Article> {
    const authorizationHeader = await this.authenticationService.obtainAuthorizationHeaders();
    return this.http
      .get(href, { headers: authorizationHeader, observe: 'response' })
      .pipe(
        catchError(HttpUtil.httpErrorResponseHandler),
        map(response => this.articleTransformer.toPojo(response))
      )
      .toPromise();
  }
  
  private findAllBuildUrl(page: Page): string {
    return `/matchandtrade-api/v1/articles?_pageNumber=${page.number}&_pageSize=${page.size}`;
  }

  async save(trade: Article): Promise<Article> {
    const authorizationHeader: HttpHeaders = await this.authenticationService.obtainAuthorizationHeaders();
    const request: HttpRequest<Article> = this.buildSaveRequest(authorizationHeader, trade);
    return this.http
      .request(request)
      .pipe(
        catchError(HttpUtil.httpErrorResponseHandler),
        map(response => this.articleTransformer.toPojo(response))
      )
      .toPromise();
  }
}
