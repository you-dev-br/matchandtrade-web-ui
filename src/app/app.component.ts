import { Component } from '@angular/core';
import { NavigationService } from './service/navigation.service';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMobileMenuExpanded = false;

  constructor (
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService) {
  }
  
  classMobileMenu(): string {
    let expanded = this.isMobileMenuExpanded ? 'menu-mobile-expanded' : '';
    return 'menu-mobile-items mat-body-strong hide-in-large-devices ' + expanded;
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  navigate(path: string): void {
    this.isMobileMenuExpanded = false;
    this.navigationService.navigate(path);
  }

  async signOff() {
    await this.authenticationService.singOff();
    this.navigationService.navigate('welcome');
  }

  toggleMobileMenu() {
    this.isMobileMenuExpanded = !this.isMobileMenuExpanded;
  }
}
