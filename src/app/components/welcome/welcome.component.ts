import { Component } from '@angular/core';

import { NavigationService } from '../../services/navigation.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(private navigationService: NavigationService) { }

  navigateToTradeList() {
    this.navigationService.navigate('/trade-list');
  }

  signInWithGoogle() {
    this.navigationService.goToLocation(environment.authenticateUrl);
  }

}
