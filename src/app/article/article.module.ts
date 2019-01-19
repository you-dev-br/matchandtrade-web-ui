import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCommonModule } from '../common/common.module';
import { ArticleListComponent } from './list/article-list.component';
import { ArticleRoutingModule } from './article-routing.module';
import { MaterialDesignModule } from '../config/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticleListComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    ArticleRoutingModule,
    AppCommonModule,
  ]
})
export class ArticleModule { }
