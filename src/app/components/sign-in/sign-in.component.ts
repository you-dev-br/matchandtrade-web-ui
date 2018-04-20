import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [NavigationService]
})
export class SignInComponent {
  googleUrl: string;
  // Controlling when signing out to avoid the UI to flash between sing-in/out
  signingOut: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService
  ) {
    this.googleUrl = environment.authenticateUrl;
  }

  signOut(): void {
    this.signingOut = true;
    console.log('signingout', this.signingOut, this.authenticationService.isSignedIn());
    this.authenticationService.signOut()
      .then(v => this.navigationService.navigate('home'))
      .catch(() => this.signingOut = false);
  }

  isSignedIn(): boolean {
    return this.signingOut || this.authenticationService.isSignedIn();
  }

}
