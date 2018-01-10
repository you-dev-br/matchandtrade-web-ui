import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication-callback',
  templateUrl: './authentication-callback.component.html',
  styleUrls: ['./authentication-callback.component.scss']
})
export class AuthenticationCallbackComponent {
  authorizationHeader: string;

  constructor(private authenticationService: AuthenticationService ) {
    authenticationService.get().then((v) => {
      this.authorizationHeader = v.authorizationHeader;
    });
  }

}
