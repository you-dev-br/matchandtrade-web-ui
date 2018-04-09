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

  constructor(
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService
  ) {
    this.googleUrl = environment.authenticateUrl;
  }

  signOut(): void {
    this.authenticationService.signOut().then(v => this.navigationService.navigate('/'));
  }

  isSignedIn(): boolean {
    return this.authenticationService.isSignedIn();
  }

}
