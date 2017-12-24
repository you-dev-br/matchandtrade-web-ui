import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication-callback',
  templateUrl: './authentication-callback.component.html',
  styleUrls: ['./authentication-callback.component.scss']
})
export class AuthenticationCallbackComponent {
  authorizationHeader: string;
  userId: number;

  constructor(private authenticationService: AuthenticationService ) {
    authenticationService.getAuthorization().then((v) => {
      this.authorizationHeader = v.authorizationHeader;
      this.userId = v.userId;
    });
  }

}
