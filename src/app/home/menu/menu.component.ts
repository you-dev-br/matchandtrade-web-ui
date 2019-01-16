import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  mobileMenuExpanded = false;

  constructor (
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService) {
  }

  private removeDisplayNoneFromClasses(classes: string): string {
    if (classes) {
      return classes.replace('display-none', '');
    }
    return '';
  }
  
  classMobileMenu(): string {
    const expanded = this.mobileMenuExpanded ? 'menu-mobile-expanded' : '';
    return 'menu-mobile-items mat-body-strong hide-in-large-devices ' + expanded;
  }
  
  classSingIn(classes: string): string {
    const defaultClasses = this.removeDisplayNoneFromClasses(classes);
    return this.authenticationService.isAuthenticated() ? 'display-none' : defaultClasses;
  }

  classSingOff(classes: string): string {
    const defaultClasses = this.removeDisplayNoneFromClasses(classes);
    return this.authenticationService.isAuthenticated() ? defaultClasses : 'display-none';
  }

  navigate(path: string): void {
    this.mobileMenuExpanded = false;
    this.navigationService.navigate(path);
  }

  async signOff() {
    await this.authenticationService.singOff();
    this.navigationService.navigate('welcome');
  }

  toggleMobileMenu() {
    this.mobileMenuExpanded = !this.mobileMenuExpanded;
  }
}
