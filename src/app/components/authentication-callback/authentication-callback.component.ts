import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication-callback',
  templateUrl: './authentication-callback.component.html',
  styleUrls: ['./authentication-callback.component.scss'],
  providers: [AuthenticationService]
})
export class AuthenticationCallbackComponent {
  authenticationHeader: string;

  constructor(private http: Http, private authenticationService: AuthenticationService ) {
    authenticationService.getAuthorizationHeader().subscribe(
      response => {
        this.authenticationHeader = response;
      },
      errr => {
        // TODO: Change to a logging service
        console.log(errr);
      });
  }

}
