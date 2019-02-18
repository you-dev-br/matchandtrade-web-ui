import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

import { Article } from 'src/app/class/pojo/article';
import { AuthenticationService } from '../../service/authentication.service';
import { LoadingAndMessageBannerSupport } from 'src/app/class/common/loading-and-message-banner-support';
import { KeyValue } from '@angular/common';
import { NavigationService } from 'src/app/service/navigation.service';
import { Pagination } from 'src/app/class/search/pagination';
import { SearchService } from '../../service/search.service';
import { SearchCriteria, Field, SortType } from '../../class/search/search-criteria';
import { Transformer } from '../../class/transformer/transformer';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent extends LoadingAndMessageBannerSupport implements OnInit {
  articles = new Array<Article>();
  pagination = new Pagination(1, 15);
  sortBy: string = Field.ARTICLE_NAME;

  constructor(
      private authenticationService: AuthenticationService,
      private navigationService: NavigationService,
      private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.findAll();
  }

  async findAll(): Promise<void> {
    this.loading = true;
    try {
      const userId = await this.authenticationService.obtainUserId();
      const searchCriteria = new SearchCriteria();
      searchCriteria.addCriterion(Field.USER_ID, userId);
      searchCriteria.addSort(this.sortBy, SortType.ASC);
      const searchResult = await this.searchService.searchArticles(searchCriteria, this.pagination.page);
      this.articles = searchResult.results;
      this.pagination = searchResult.pagination;
    } catch (e) {
      this.showErrorMessage(e);
    } finally {
      this.loading = false;
    }
  }

  hasArticles(): boolean {
    return this.articles.length > 0;
  }

  navigateToArticle(article?: Article): void {
    const href = article ? article.getSelfHref() : null;
    this.navigationService.navigate("article/entry", {articleHref: href});
  }

  obtainSortByValues(): KeyValue<string, string>[] {
    return [{key: Field.ARTICLE_NAME, value: 'Name'}, {key: Field.ARTICLE_ID, value: 'Created date'}]
  }

  onPageChange(pageEvent: PageEvent): void {
    this.pagination.page.number = pageEvent.pageIndex + 1;
    this.findAll();
  }

  onSortBy(sort: string): void {
    this.sortBy = String(Transformer.obtainKeyFromEnumeration(sort, Field));
    this.findAll();
  }
}
