import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { LoginModel } from '../Models/Dtos/LoginModel';
import { ApiService } from './apis/api.service';
import { ConstRouteService } from './const/const-route.service';
import { UserService } from './user.service';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private _token: string;

  get token(): string {
    return this._token;
  }

  get isAuthorizated(): boolean {
    return !!this._token;
  }

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  saveToken(token: string): void {
    this._token = token;
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  login(credentials: LoginModel): Observable<boolean> {
    return this.api.login(credentials).pipe(
      map((res) => {
        this.saveToken(res.token);
        this.userService.setCurrentUser(res.user);
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }

  logout(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem('user');
    this._token = null;
    this.userService.removeUser();
    this.router.navigate([`/${ConstRouteService.login}`]);
  }

  //QA method se koristi na app modul da bi se na citanje modula pokrenulo
  //uzimanje tokena iz LS kako to ne bi radili na gardovima oko logina, ili home page
  initService(): void {
    this._token = window.localStorage.getItem(TOKEN_KEY);
    this.userService.setCurrentUser(
      JSON.parse(window.localStorage.getItem('user'))
    );
  }
}
