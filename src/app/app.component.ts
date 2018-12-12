import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	isMobileMenuExpanded = true;
	
	classMobileMenu(): string {
		let expanded = this.isMobileMenuExpanded ? 'menu-mobile-expanded' : '';
		return 'menu-mobile-items mat-body-strong hide-in-large-devices ' + expanded;
	}

	toggleMobileMenu() {
		this.isMobileMenuExpanded = !this.isMobileMenuExpanded;
	}
}
