import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  googleUrl: string;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.googleUrl = environment.authenticateUrl;
  }

  signOut(): void {
    this.authenticationService.signOut().then(v => {
      window.location.href = '/';
    });
  }

  isSignedIn(): boolean {
    return this.authenticationService.isSignedIn();
  }

}
