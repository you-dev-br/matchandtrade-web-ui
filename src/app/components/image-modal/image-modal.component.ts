import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {

  @Input() isActive: boolean = false;
  @Input() imageSource: string = "http://via.placeholder.com/1280x960.png";
  @Output() onClose = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  classModal():string {
    return 'modal ' + (this.isActive ? 'is-active' : '');
  }

  closeModal(): boolean {
    console.log('closing');
    this.onClose.emit(this.imageSource);
    return false; // Return false to prevent browser to submit when button is clicked
  }

}
