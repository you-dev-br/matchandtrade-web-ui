import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCommonModule } from '../common/common.module';
import { ArticleListComponent } from './list/article-list.component';
import { ArticleRoutingModule } from './article-routing.module';
import { MaterialDesignModule } from '../config/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleEntryComponent } from './article-entry/article-entry.component';

@NgModule({
  declarations: [ArticleListComponent, ArticleEntryComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    ArticleRoutingModule,
    AppCommonModule,
  ]
})
export class ArticleModule { }
