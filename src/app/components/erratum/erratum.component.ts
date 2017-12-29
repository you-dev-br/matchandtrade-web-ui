import { Component, Input } from '@angular/core';
import { Erratum } from '../../classes/pojo/erratum'

@Component({
  selector: 'app-erratum',
  templateUrl: './erratum.component.html',
  styleUrls: ['./erratum.component.scss']
})
export class ErratumComponent {
  @Input() private errata: Erratum[];

}
