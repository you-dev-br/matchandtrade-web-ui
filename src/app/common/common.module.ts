import { NgModule } from '@angular/core';
import { ContentTitleComponent } from './content-title/content-title.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { MaterialDesignModule } from '../config/material-design.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ContentTitleComponent, MessagePanelComponent, SpinnerComponent],
  imports: [
		CommonModule,
    MaterialDesignModule,
  ],
  exports: [
    ContentTitleComponent,
		MessagePanelComponent,
		SpinnerComponent,
  ]
})
export class AppCommonModule { }
