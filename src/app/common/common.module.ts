import { NgModule } from '@angular/core';
import { ContentTitleComponent } from './content-title/content-title.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { MaterialDesignModule } from '../config/material-design.module';

@NgModule({
  declarations: [ContentTitleComponent, MessagePanelComponent],
  imports: [
    MaterialDesignModule
  ],
  exports: [
    ContentTitleComponent,
    MessagePanelComponent
  ]
})
export class AppCommonModule { }
