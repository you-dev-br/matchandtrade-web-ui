import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() isLoading: boolean;
  @Input() containerHeight: number = 5;
  @Input() imageHeight: number = 5;  

  constructor() { }

}
