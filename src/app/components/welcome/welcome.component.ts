import { Component } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { NavigationService } from '../../services/navigation.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService) { }

  navigateToTradeList() {
    this.navigationService.navigate('/trade-list');
  }

  signInWithGoogle() {
    this.navigationService.goToLocation(environment.authenticateUrl);
  }

  isSignedIn(): boolean {
    console.log('isSignedIn', this.authenticationService.isSignedIn());
    return this.authenticationService.isSignedIn();
  }

}
