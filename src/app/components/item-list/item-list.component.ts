import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  @Input() tradeMembershipHref: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.tradeMembershipHref = this.route.snapshot.paramMap.get('tradeMembershipHref');
  }

  createItem() {
    this.router.navigate(['items', {tradeMembershipHref: this.tradeMembershipHref}]);
  }

}
