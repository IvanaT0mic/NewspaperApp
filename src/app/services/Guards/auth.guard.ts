import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthorizationService } from '../authorization.service';
import { ConstRouteService } from '../const/const-route.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService,
    private userService: UserService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!this.authorizationService.isAuthorizated) {
      this.router.navigate[`/${ConstRouteService.login}`];
      this.authorizationService.logout();
      return of(false);
    }

    // this.userService.setCurrentUser();

    return of(true);
  }
}
