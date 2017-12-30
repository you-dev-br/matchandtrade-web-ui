import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authenticationService.get().then((v) => {
      if (v.authorizationHeader) {
        return true;
      } else {
        return false;
      }
    }).catch((e) => {return false});

  }
}
