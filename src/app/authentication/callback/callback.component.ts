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
      // Calling obtainAuthorizationHeaders; so we can validate the authentication cycle.
      // And it also caches the authorization headers.
      await this.authenticationService.obtainAuthorizationHeaders();
      this.navigationService.navigate('/');
    } catch (e) {
      this.errorMessage = e;
    }
  }

  onTryGain() {
    this.navigationService.navigate('/authentication');
  }
}
