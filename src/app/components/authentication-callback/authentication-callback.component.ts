import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { Message } from '../message/message';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-authentication-callback',
  templateUrl: './authentication-callback.component.html',
  styleUrls: ['./authentication-callback.component.scss']
})
export class AuthenticationCallbackComponent {
  authorizationHeader: string;
  message: Message = new Message();
  loading: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private router: Router) {
    authenticationService.get().then((v) => {
      this.authorizationHeader = v.authorizationHeader;
      this.navigationService.navigate('trade-list');
    })
    .catch(e => {
      this.message.setErrorItems(e);
      this.loading = false;
    });
  }
}
