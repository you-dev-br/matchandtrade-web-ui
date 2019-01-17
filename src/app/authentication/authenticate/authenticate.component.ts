import { Component } from '@angular/core';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent {
  constructor(
    private navigationService: NavigationService) { }

  async singIn(): Promise<void> {
    this.navigationService.goToLocation('/matchandtrade-api/v1/authenticate');
  }
}
