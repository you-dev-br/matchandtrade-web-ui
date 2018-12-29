import { Component } from '@angular/core';
import { NavigationService } from './service/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMobileMenuExpanded = false;

  constructor (
    private navigationService: NavigationService) {
  }
  
  classMobileMenu(): string {
    let expanded = this.isMobileMenuExpanded ? 'menu-mobile-expanded' : '';
    return 'menu-mobile-items mat-body-strong hide-in-large-devices ' + expanded;
  }

  navigate(path: string): void {
    this.isMobileMenuExpanded = false;
    this.navigationService.navigate(path);
  }

  toggleMobileMenu() {
    this.isMobileMenuExpanded = !this.isMobileMenuExpanded;
  }
}
