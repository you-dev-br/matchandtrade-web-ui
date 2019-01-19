import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient) { }

  findAll(page: Page): Promise<SearchResult<Article>> {
    return this.http
      .get(this.findAllBuildUrl(page), { observe: 'response' })
      .pipe(
        catchError(HttpUtil.httpErrorResponseHandler),
        map(response => this.articleTransformer.toSearchResult(response, page))
      )
      .toPromise();
  }
  
  private findAllBuildUrl(page: Page): string {
    return `/matchandtrade-api/v1/articles?_pageNumber=${page.number}&_pageSize=${page.size}`;
  }
}
