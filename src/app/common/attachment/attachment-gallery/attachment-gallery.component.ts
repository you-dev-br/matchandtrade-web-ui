import { Component, OnInit, Input } from '@angular/core';
import { Attachment } from 'src/app/class/attachment';
import { Link } from 'src/app/class/pojo/link';

@Component({
  selector: 'app-attachment-gallery',
  templateUrl: './attachment-gallery.component.html',
  styleUrls: ['./attachment-gallery.component.scss']
})
export class AttachmentGalleryComponent implements OnInit {

  @Input()
  attachments: Attachment[] = [];

  constructor() { }

  ngOnInit() {
    let test = new Attachment();
    test.attachmentId = "84b2c4dc-cf60-47ef-ae55-c1e9bd5320a1";
    test.contentType = "image/jpeg";
    test.name = "chess.jpg";
    test.links.push(new Link("self", "http://localhost:4200/matchandtrade-api/v1/attachments/660782f4-d2d0-4d80-8921-1b8aaf6be6fd"));
    test.links.push(new Link("original", "2019/2/41e6306a-c484-41ae-8d60-94c675058069.jpg"));
    test.links.push(new Link("thumbnail", "2019/2/2a38fea2-8f99-4a91-ab52-575fe0072a5b.jpg"));
    
  }

  onUploadComplete(attachment: Attachment): void {
    if (attachment) {
      this.attachments.push(attachment);
    }
  }
}
