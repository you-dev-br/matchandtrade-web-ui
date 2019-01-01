import { Component } from '@angular/core';
import { NavigationService } from 'src/app/service/navigation.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService) { }

  async singIn(): Promise<void> {
    await this.authenticationService.singOff();
    this.navigationService.goToLocation('/matchandtrade-api/v1/authenticate');
  }
}
