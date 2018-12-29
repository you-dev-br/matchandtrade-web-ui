import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { NavigationService } from '../../service/navigation.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  errorMessage: string;

  constructor(
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService) { }

  async ngOnInit() {
    try {
      const authorizationHeader: string = await this.authenticationService.findAuthenticationInfo();
      this.authenticationService.setAuthorizationHeader(authorizationHeader);
      this.navigationService.navigate('/');
    } catch (e) {
      this.errorMessage = e;
    }
  }

  onTryGain() {
    this.navigationService.navigate('/authentication');
  }
}
