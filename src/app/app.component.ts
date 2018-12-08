import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMobileMenuExpanded = false;

  classMobileMenu(): string {
    let expanded = this.isMobileMenuExpanded ? 'x-menu-mobile-expanded' : '';
    return 'x-header-menu-mobile-items ' + expanded;
  }

  toogleMobileMenu() {
    this.isMobileMenuExpanded = !this.isMobileMenuExpanded;
  }
}
