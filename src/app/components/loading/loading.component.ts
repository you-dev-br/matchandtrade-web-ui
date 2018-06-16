import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() loading: boolean = false;
  @Input() containerHeight?: number = 20;
  @Input() iconSize?: number = 3;  

  constructor() { }

  getContainerHeight():number {
    return this.containerHeight;
  }

  getIconSize(): number {
    return this.iconSize;
  }

}
