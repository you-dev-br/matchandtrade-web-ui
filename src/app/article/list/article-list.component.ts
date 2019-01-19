import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

import { Article } from 'src/app/class/pojo/article';
import { ArticleService } from 'src/app/service/article.service';
import { LoadingAndMessageBannerSupport } from 'src/app/class/common/loading-and-message-banner-support';
import { NavigationService } from 'src/app/service/navigation.service';
import { Pagination } from 'src/app/class/search/pagination';
import { SearchResult } from 'src/app/class/search/search-result';
import { Trade } from 'src/app/class/pojo/trade';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent extends LoadingAndMessageBannerSupport implements OnInit {
  articles: Article[] = [];
  pagination: Pagination = new Pagination(1, 15);

  constructor(private articleService: ArticleService,
    private navigationService: NavigationService) {
    super();
  }

  ngOnInit() {
    this.findAll();
  }
  
  private async findAll() {
    this.loading = true;
    try {
      const searchResult: SearchResult<Article> = await this.articleService.findAll(this.pagination.page);
      this.articles = searchResult.results;
      this.pagination = searchResult.pagination;
    } catch (e) {
      this.showErrorMessage(e);
    } finally {
      this.loading = false;
    }
  }

  navigate(trade?: Trade) {
    const href = trade ? trade.getSelfHref() : null;
    this.navigationService.navigate("trade/entrie", {tradeHref: href});
  }

  onPageChange(pageEvent: PageEvent) {
    this.pagination.page.number = pageEvent.pageIndex + 1;
    this.pagination.page.size = pageEvent.pageSize;
    this.pagination.totalEntries = pageEvent.length;
    this.findAll();
  }
}
