import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstRouteService {
  static readonly login: string = 'login';
  static readonly home: string = 'home';
  static readonly articles: string = 'articles';
  static readonly myArticles: string = 'private-articles';
  static readonly profile: string = 'profile';
  static readonly register: string = 'register';
  static readonly userDashboard: string = 'user-dashboard';
  static readonly userInfo: string = 'user-info';
  static readonly contactAdmin: string = 'contact-admin';
  static readonly tags: string = 'tags';

  constructor() {}
}
