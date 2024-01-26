import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactAdminModel } from '../Models/Dtos/ContantAdminModel';
import { CreateUserModel } from '../Models/Dtos/CreateUserModel';
import { UpdateUserModel } from '../Models/Dtos/UpdateUserModel';
import { UserExtendedModel } from '../Models/Dtos/UserExtendedModel';
import { UserModel } from '../Models/Dtos/UserModel';
import { ApiService } from './apis/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: UserExtendedModel;

  get user(): UserExtendedModel {
    //QA vracamo deep copy
    return JSON.parse(JSON.stringify(this._user));
  }

  get isAuthenticated(): boolean {
    return !!this._user;
  }

  constructor(private api: ApiService, private router: Router) {}

  removeUser() {
    this._user = null;
  }

  getAllUsers(): Observable<Array<UserModel>> {
    return this.api.getAllUsers();
  }

  getUserById(id: number): Observable<UserExtendedModel> {
    return this.api.getUserExtendedById(id);
  }

  setCurrentUser(data: UserExtendedModel): void {
    this._user = data;
    window.localStorage.setItem('user', JSON.stringify(this._user));
  }

  contactAdmin(data: ContactAdminModel): Observable<any> {
    return this.api.contactAdmin(data);
  }

  updateUser(id: number, data: UpdateUserModel): Observable<any> {
    return this.api.updateUser(id, data);
  }

  registerUser(user: CreateUserModel): Observable<any> {
    return this.api.createUser(user);
  }

  isAdmin(): boolean {
    //['Journalist', 'Admin', "User"]
    return this.user.roles.includes('Admin');
  }

  isJournalist(): boolean {
    return this.user.roles.includes('Journalist');
  }
}
