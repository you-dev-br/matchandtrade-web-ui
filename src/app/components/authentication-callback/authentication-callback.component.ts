import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AUTHORIZATION_HEADER_OBSERVABLE, AUTHORIZATION_HEADER_SUBJECT } from '../../classes/state/global-state';

@Component({
  selector: 'app-authentication-callback',
  templateUrl: './authentication-callback.component.html',
  styleUrls: ['./authentication-callback.component.scss'],
  providers: [AuthenticationService]
})
export class AuthenticationCallbackComponent {
  authorizationHeader: string;
  userId: number;

  constructor(private authenticationService: AuthenticationService ) {
    AUTHORIZATION_HEADER_OBSERVABLE.subscribe((v) => {
      this.authorizationHeader = v.authorizationHeader;
      this.userId = v.userId;
    });
    authenticationService.getAuthorization();
  }

}
