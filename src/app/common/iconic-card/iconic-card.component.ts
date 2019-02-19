import { Component, OnInit, Input, ViewChildren, ElementRef } from '@angular/core';

@Component({
  selector: 'app-iconic-card',
  templateUrl: './iconic-card.component.html',
  styleUrls: ['./iconic-card.component.scss']
})
export class IconicCardComponent implements OnInit {
  @Input()
  icon: string = '/assets/icons/icons8-snail-48.png';
  @Input()
  title!: string;

  constructor() { }

  ngOnInit() {
  }

}
