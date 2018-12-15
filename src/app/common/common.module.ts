import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentTitleComponent } from './content-title/content-title.component';
import { MaterialDesignModule } from '../config/material-design.module';

@NgModule({
  declarations: [ContentTitleComponent],
  imports: [
    CommonModule,
    MaterialDesignModule
  ],
  exports: [
    ContentTitleComponent
  ]
})
export class AppCommonModule { }
