import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  navigationBarWidth: number;
  burgerClass: string = "burger-menu-inactive";

  constructor() {
    this.navigationBarWidth = window.innerWidth;
  }

  onResize(navigationBarHtmlElement: HTMLElement) {
    this.navigationBarWidth = navigationBarHtmlElement.clientWidth;
  }

  onClickBurger() {
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

}
