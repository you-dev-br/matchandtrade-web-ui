import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-iconic-card',
  templateUrl: './iconic-card.component.html',
  styleUrls: ['./iconic-card.component.scss']
})
export class IconicCardComponent implements OnInit {
  @Input()
  visible: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
