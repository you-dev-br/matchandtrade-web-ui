import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  navigationBarWidth: number;
  burgerClass: string = "burger-menu-inactive";
  authenticated: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.navigationBarWidth = window.innerWidth;
  }

  ngOnInit() {
    this.authenticationService.get().then(v => {
      this.authenticated = (v.authorizationHeader ? true : false);
    }).catch(e => console.log("User not authenticated"));
  }

  onResize(navigationBarHtmlElement: HTMLElement) {
    this.navigationBarWidth = navigationBarHtmlElement.clientWidth;
  }

  toggleBurgerMenu() {
    if (this.burgerClass == "burger-menu-inactive") {
      this.burgerClass = "burger-menu-active";
    } else {
      this.burgerClass = "burger-menu-inactive";
    }
  }

  isSmallScreenSize(): boolean {
    let smallScreenSize = 400;
    if (this.navigationBarWidth < smallScreenSize) {
      return true;
    } else {
      return false;
    }
  }

  signText() {
    return (this.authenticated ? 'Sign-out' : 'Sign-in');
  }

  onSign() {
    this.router.navigate(['/sign-in']);
  }

  onTrades() {
    this.router.navigate(['/trade-list']);
  }

}
