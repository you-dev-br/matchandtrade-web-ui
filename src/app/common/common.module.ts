import { NgModule } from '@angular/core';
import { ContentTitleComponent } from './content-title/content-title.component';
import { MessageBannerComponent } from './message-banner/message-banner.component';
import { MaterialDesignModule } from '../config/material-design.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ContentTitleComponent, MessageBannerComponent, SpinnerComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
  ],
  exports: [
    ContentTitleComponent,
    MessageBannerComponent,
    SpinnerComponent,
  ]
})
export class AppCommonModule { }
