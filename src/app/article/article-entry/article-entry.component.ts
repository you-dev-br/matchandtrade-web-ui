import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { LoadingAndMessageBannerSupport } from '../../class/common/loading-and-message-banner-support';
import { NavigationService } from '../../service/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../class/pojo/article';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'app-article-entry',
  templateUrl: './article-entry.component.html',
  styleUrls: ['./article-entry.component.scss']
})
export class ArticleEntryComponent extends LoadingAndMessageBannerSupport implements OnInit {
  article: Article = new Article();
  descriptionFormControl: AbstractControl;
  formGroup: FormGroup;
  nameFormControl: AbstractControl;
  newEntry: boolean;
  @ViewChild('title', { read: ElementRef })
  title: ElementRef;


  constructor(
    private articleService: ArticleService,
    private formBuilder: FormBuilder,
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
        await this.loadArticle();
      }
    } catch (e) {
      this.showErrorMessage(e);
    } finally {
      this.loading = false;
    }
  }

  // TODO: Implement-me
  private authenticatedUserIsArticleOwner(): boolean {
    return true;
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1000)])],
    });
    this.nameFormControl = this.formGroup.controls['name'];
    this.descriptionFormControl = this.formGroup.controls['description'];
  }

  private async loadArticle(): Promise<void> {
    this.newEntry = false;
    this.nameFormControl.setValue(this.article.name);   
    this.descriptionFormControl.setValue(this.article.description);
    // TODO: Disable form if autheticated user does not own the article
  }

  private loadArticleFromForm() {
    this.article.name = this.nameFormControl.value;
    this.article.description = this.descriptionFormControl.value;
  }

  async onSubmit() {
    this.loading = true;
    try {
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

  classMainForm(): string {
    return this.loading ? "mt-content mt-hide" : "mt-content";
  }

  showSaveButton(): boolean {
    return this.authenticatedUserIsArticleOwner();
  }
}
