import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    return this.authenticationService.get().then((v) => {
      if (v.authorizationHeader) {
        return true;
      } else {
        this.router.navigate(['sign-in']);
        return false;
      }
    }).catch((e) => {
      this.router.navigate(['sign-in'])
      return false;
    });

  }
}
