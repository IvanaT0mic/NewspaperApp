import { Injectable } from '@angular/core';

@Injectable()
export class ConstRouteService {
  static readonly login: string = 'login';
  static readonly contactAdmin: string = 'contact-admin';
  static readonly home: string = 'home';
  static readonly articles: string = 'articles';
  static readonly myArticles: string = 'private-articles';
  static readonly createArticle: string = 'create-article';
  static readonly editArticle: string = 'edit-article';
  static readonly tags: string = 'tags';
  static readonly userDashboard: string = 'user-dashboard';
  static readonly profile: string = 'profile';
  static readonly register: string = 'register';
  static readonly userInfo: string = 'user-info';

  constructor() {}
}
