import { Component, OnInit } from '@angular/core';
import { Attachment } from 'src/app/class/attachment';

@Component({
  selector: 'app-attachment-gallery',
  templateUrl: './attachment-gallery.component.html',
  styleUrls: ['./attachment-gallery.component.scss']
})
export class AttachmentGalleryComponent implements OnInit {

  attachments: Attachment[] = [];

  constructor() { }

  ngOnInit() {
  }


}
