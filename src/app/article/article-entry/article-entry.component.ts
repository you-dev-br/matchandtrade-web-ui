import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { Article } from '../../class/pojo/article';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ArticleService } from '../../service/article.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingAndMessageBannerSupport } from '../../class/common/loading-and-message-banner-support';
import { NavigationService } from '../../service/navigation.service';
import { Page } from '../../class/search/page';
import { SearchCriteria, Field } from '../../class/search/search-criteria';
import { SearchService } from 'src/app/service/search.service';
import { ValidatorUtil } from 'src/app/class/common/validator-util';

@Component({
  selector: 'app-article-entry',
  templateUrl: './article-entry.component.html',
  styleUrls: ['./article-entry.component.scss']
})
export class ArticleEntryComponent extends LoadingAndMessageBannerSupport implements OnInit {
  article: Article = new Article();
  descriptionFormControl: AbstractControl;
  authenticatedUserIsArticleOwner: boolean = true;
  formGroup: FormGroup;
  nameFormControl: AbstractControl;
  newEntry: boolean;
  @ViewChild('title', { read: ElementRef })
  title: ElementRef;

  constructor(
    private authenticationService: AuthenticationService,
    private articleService: ArticleService,
    private formBuilder: FormBuilder,
    private searchService: SearchService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
  ) {
    super();
  }

  async ngOnInit() {
    this.buildForm();
    try {
      const articleHref = this.navigationService.obtainData(this.route).articleHref;
      if (articleHref) {
        this.article = await this.articleService.find(articleHref);
        await this.initAuthenticatedUserIsArticleOwner();
        await this.loadArticle();
      }
    } catch (e) {
      this.showErrorMessage(e);
    } finally {
      this.loading = false;
    }
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, ValidatorUtil.minLengthWithTrim(3), ValidatorUtil.maxLengthWithTrim(150)])],
      'description': ['', Validators.compose([ValidatorUtil.minLengthWithTrim(3), ValidatorUtil.maxLengthWithTrim(1000)])],
    });
    this.nameFormControl = this.formGroup.controls['name'];
    this.descriptionFormControl = this.formGroup.controls['description'];
  }

  classMainForm(): string {
    return this.loading ? "mt-content mt-hide" : "mt-content";
  }

  private async initAuthenticatedUserIsArticleOwner(): Promise<void> {
    const userId = await this.authenticationService.obtainUserId();
    const searchCriteria = new SearchCriteria();
    searchCriteria.addCriterion(Field.ARTICLE_ID, this.article.articleId);
    searchCriteria.addCriterion(Field.USER_ID, userId);
    const searchResult = await this.searchService.findArticle(searchCriteria, new Page(1,1));
    this.authenticatedUserIsArticleOwner = (searchResult.pagination.totalEntries > 0);
  }

  private async loadArticle(): Promise<void> {
    this.newEntry = false;
    this.nameFormControl.setValue(this.article.name);   
    this.descriptionFormControl.setValue(this.article.description);
    if (!this.authenticatedUserIsArticleOwner) {
      this.formGroup.disable();
    }
  }

  private loadArticleFromForm() {
    this.article.name = this.nameFormControl.value.trim();
    this.article.description = this.descriptionFormControl.value ? this.descriptionFormControl.value.trim() : undefined;
  }

  async onSubmit() {
    this.loading = true;
    try {
      this.validate();
      this.loadArticleFromForm();
      this.article = await this.articleService.save(this.article);
      this.loadArticle();
      this.showInfoMessage('Article saved', 'save');
    } catch (e) {
      this.showErrorMessage(e);
    } finally {
      this.loading = false;
      this.title.nativeElement.scrollIntoView();
    }
  }

  showSaveButton(): boolean {
    return !this.formGroup.disabled;
  }
  
  // TODO: Can we get the error details form Validators?
  validate() {
    if (!this.nameFormControl.valid) {
      throw new Error("Article name is manadatory and must contain between 3 and 150 characters.");
    }
    if (!this.descriptionFormControl.valid) {
      throw new Error("Article description must contain between 3 and 1000 characters.");
    }
  }
}
