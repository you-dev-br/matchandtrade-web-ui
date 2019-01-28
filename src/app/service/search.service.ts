import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Article } from '../class/pojo/article';
import { HttpClient } from '@angular/common/http';
import { ArticleTransformer } from '../class/transformer/article-transformer';
import { HttpUtil } from '../class/common/http-util';
import { map, catchError, } from 'rxjs/operators';
import { SearchCriteria, Recipe } from '../class/search/search-criteria';
import { SearchResult } from '../class/search/search-result';
import { Page } from '../class/search/page';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  articleTransformer: ArticleTransformer = new ArticleTransformer();

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) { }

  async findArticle(searchCriteria: SearchCriteria, page: Page): Promise<SearchResult<Article>> {
    const authorizationHeader = await this.authenticationService.obtainAuthorizationHeaders();
    searchCriteria.recipe = Recipe.ARTICLES;
    return this.http
      .post(
        '/matchandtrade-api/v1/search',
        searchCriteria,
        { headers: authorizationHeader, observe: 'response' })
      .pipe(
        catchError(HttpUtil.httpErrorResponseHandler),
        map(response => this.articleTransformer.toSearchResult(response, page))
      )
      .toPromise();
  }
}
