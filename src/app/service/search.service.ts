import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Article } from '../class/pojo/article';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { ArticleTransformer } from '../class/transformer/article-transformer';
import { HttpUtil } from '../class/common/http-util';
import { map, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  articleTransformer: ArticleTransformer = new ArticleTransformer();

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) { }

  async findArticle(userId: number, articleId: number): Promise<Article[]> {
    const authorizationHeader = await this.authenticationService.obtainAuthorizationHeaders();
    const requestBody = {
      recipe: 'ARTICLES',
      criteria: [{
        field: 'User.userId',
        value: userId
      }, {
        field: 'Article.articleId',
        value: articleId
      }]
    };
    let request = new HttpRequest<any>('POST', '/matchandtrade-api/v1/search',
      requestBody,
      {headers: authorizationHeader});
    
    return this.http
      .request(request)
      .pipe(
        catchError(HttpUtil.httpErrorResponseHandler),
        map(response => this.articleTransformer.toPojos(response)))
      .toPromise();
  }
}
