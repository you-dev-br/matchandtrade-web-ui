import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {

  @Input() isActive: boolean = false;
  @Input() imageSource: string = "http://via.placeholder.com/1280x960.png";
  @Output() onClose = new EventEmitter<string>();

  constructor() { }

  classModal(): string {
    return 'modal' + (this.isActive ? ' is-active' : '');
  }

  closeModal(): void {
    this.onClose.emit(this.imageSource);
  }

}
