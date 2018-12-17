import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.scss']
})
export class MessagePanelComponent{
  @Input()
  message: string;

  constructor() { }
}
