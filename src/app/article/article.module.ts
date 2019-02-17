import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialImageOverlayModule } from 'angular-material-image-overlay';

import { AppCommonModule } from '../common/common.module';
import { ArticleEntryComponent } from './article-entry/article-entry.component';
import { ArticleListComponent } from './list/article-list.component';
import { ArticleRoutingModule } from './article-routing.module';
import { MaterialDesignModule } from '../config/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticleListComponent, ArticleEntryComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    ArticleRoutingModule,
    AppCommonModule,
    AngularMaterialImageOverlayModule
  ]
})
export class ArticleModule { }
