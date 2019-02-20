import { Component, OnInit } from '@angular/core';
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
import { ValidationError } from 'src/app/class/common/validation-error';
import { Attachment } from 'src/app/class/attachment';
import { AttachmentService } from '../../service/attachment.service';
import { MatSnackBar } from '@angular/material';
import { SnackBarHelper } from 'src/app/src/app/class/common/snack-bar-helper';

@Component({
  selector: 'app-article-entry',
  templateUrl: './article-entry.component.html',
  styleUrls: ['./article-entry.component.scss']
})
export class ArticleEntryComponent extends LoadingAndMessageBannerSupport implements OnInit {
  article: Article = new Article();
  attachments: Attachment[] = [];
  descriptionFormControl: AbstractControl;
  authenticatedUserIsArticleOwner: boolean = true;
  formGroup: FormGroup;
  nameFormControl: AbstractControl;
  newEntry: boolean;
  snackBarHelper: SnackBarHelper;

  constructor(
    private authenticationService: AuthenticationService,
    private articleService: ArticleService,
    private attachmentService: AttachmentService,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private searchService: SearchService,
    snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    super();
    this.snackBarHelper = new SnackBarHelper(snackBar, navigationService);
  }

  async ngOnInit() {
    this.buildForm();
    try {
      const articleHref = this.navigationService.obtainData(this.route).articleHref;
      if (articleHref) {
        this.article = await this.articleService.find(articleHref);
        await this.initAuthenticatedUserIsArticleOwner();
        await this.loadArticle();
        this.attachments = await this.loadAttachments(this.article.getLinkByRel("attachments"));
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
    const searchResult = await this.searchService.searchArticles(searchCriteria, new Page(1,1));
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

  private loadArticleFromForm(): void {
    this.article.name = this.nameFormControl.value.trim();
    this.article.description = this.descriptionFormControl.value ? this.descriptionFormControl.value.trim() : undefined;
  }

  private async loadAttachments(href: string): Promise<Attachment[]> {
    return this.attachmentService.findAttachmentsByHref(href);
  }

  onDeleteAttachmentError(error: Error): void {
    this.showErrorMessage(`Error when deleting attachment: ${error.message}`);
  }

  async onSubmit(): Promise<void> {
    this.loading = true;
    try {
      this.validate();
      this.loadArticleFromForm();
      this.article = await this.articleService.save(this.article);
      await this.articleService.saveAttachments(this.article, this.attachments);
      this.loadArticle();
      this.snackBarHelper.back('Article saved', 'article/entry', {articleHref: this.article.getSelfHref()})
    } catch (e) {
      this.showErrorMessage(e);
    } finally {
      this.loading = false;
    }
  }

  showSaveButton(): boolean {
    return !this.formGroup.disabled;
  }

  validate(): void {
    if (!this.descriptionFormControl.valid || !this.nameFormControl.valid) {
      throw new ValidationError("Please ensure that the fields below are valid");
    }
  }
}
