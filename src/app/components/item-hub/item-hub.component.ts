import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RouteAction } from '../../classes/route/route-action';
import { TradeMembershipService } from '../../services/trade-membership.service';
import { TradeMembership } from '../../classes/pojo/trade-membership';

@Component({
  selector: 'app-item-hub',
  templateUrl: './item-hub.component.html',
  styleUrls: ['./item-hub.component.scss'],
  providers: [ TradeMembershipService ]
})
export class ItemHubComponent implements OnInit {

  routeAction: RouteAction;
  tradeMembershipHref: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tradeMembershipService: TradeMembershipService) {
      this.tradeMembershipHref = this.route.snapshot.paramMap.get('tradeMembershipHref');
      this.routeAction = RouteAction[this.route.snapshot.paramMap.get('routeAction')];
    }

  ngOnInit() {
  }

}
