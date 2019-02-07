import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AttachmentUploaderComponent } from './attachment/attachment-uploader/attachment-uploader.component';
import { AttachmentGalleryComponent } from './attachment/attachment-gallery/attachment-gallery.component';
import { ContentTitleComponent } from './content-title/content-title.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MessageBannerComponent } from './message-banner/message-banner.component';
import { MaterialDesignModule } from '../config/material-design.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { AttachmentPreviewDialogComponent } from './attachment/attachment-preview-dialog/attachment-preview-dialog.component';

@NgModule({
  declarations: [
    ContentTitleComponent, 
    MessageBannerComponent, 
    SpinnerComponent,
    DropdownComponent,
    TextEditorComponent,
    AttachmentUploaderComponent,
    AttachmentGalleryComponent,
    AttachmentPreviewDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule
  ],
  exports: [
    ContentTitleComponent,
    MessageBannerComponent,
    SpinnerComponent,
    DropdownComponent,
    TextEditorComponent,
    AttachmentUploaderComponent,
    AttachmentGalleryComponent,
    AttachmentPreviewDialogComponent
  ],
  entryComponents: [ AttachmentPreviewDialogComponent ]
})
export class AppCommonModule { }
