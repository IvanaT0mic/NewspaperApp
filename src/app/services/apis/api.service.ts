import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleModel } from 'src/app/Models/Dtos/ArticleModel';
import { ContactAdminModel } from 'src/app/Models/Dtos/ContantAdminModel';
import { CreateArticleModel } from 'src/app/Models/Dtos/CreateArticleModel';
import { CreateUserModel } from 'src/app/Models/Dtos/CreateUserModel';
import { LoginModel } from 'src/app/Models/Dtos/LoginModel';
import { LoginResponseModel } from 'src/app/Models/Dtos/LoginResponseModel';
import { ResourceInfoModel } from 'src/app/Models/Dtos/ResourceInfoModel';
import { TagModel } from 'src/app/Models/Dtos/TagModel';
import { UpdateUserModel } from 'src/app/Models/Dtos/UpdateUserModel';
import { UserExtendedModel } from 'src/app/Models/Dtos/UserExtendedModel';
import { UserModel } from 'src/app/Models/Dtos/UserModel';

const API_KEY = 'http://localhost:8080/Newspaper/api/';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //Auth controller

  login(credentials: LoginModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(API_KEY + 'auth/login', {
      username: credentials.username,
      password: credentials.password,
    });
  }

  //ArticleController

  getAll(): Observable<Array<ArticleModel>> {
    return this.http.get<Array<ArticleModel>>(API_KEY + 'article');
  }

  getAllByStatus(status: number): Observable<Array<ArticleModel>> {
    return this.http.get<Array<ArticleModel>>(
      API_KEY + 'article/status?status=' + status
    );
  }

  getArticleById(id: number): Observable<Array<ArticleModel>> {
    return this.http.get<Array<ArticleModel>>(API_KEY + 'article/' + id);
  }

  createArticle(data: CreateArticleModel): Observable<number> {
    return this.http.post<number>(API_KEY + 'article', data);
  }

  //ResourceController
  getAllResouces(): Observable<Array<ResourceInfoModel>> {
    return this.http.get<Array<ResourceInfoModel>>(API_KEY + 'resource');
  }

  getResourceInfoById(id: number): Observable<ResourceInfoModel> {
    return this.http.get<ResourceInfoModel>(API_KEY + 'resource/info/' + id);
  }

  createResource(data: FormData): Observable<number> {
    return this.http.post<number>(API_KEY + 'resource', data);
  }

  deleteResource(id: number) {
    return this.http.delete(API_KEY + 'resource/' + id);
  }

  getResourceForDownloadById(id: number): Observable<String> {
    return this.http.get<String>(API_KEY + 'resource/download/' + id);
  }

  //TagController
  getAllTags(): Observable<Array<TagModel>> {
    return this.http.get<Array<TagModel>>(API_KEY + 'tag');
  }

  getTagById(id: number): Observable<TagModel> {
    return this.http.get<TagModel>(API_KEY + 'tag/' + id);
  }

  //UserController
  getAllUsers(): Observable<Array<UserModel>> {
    return this.http.get<Array<UserModel>>(API_KEY + 'user');
  }

  getUserExtendedById(id: number): Observable<UserExtendedModel> {
    return this.http.get<UserExtendedModel>(API_KEY + 'user/extended/' + id);
  }

  getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(API_KEY + 'user/' + id);
  }

  updateUser(id: number, user: UpdateUserModel) {
    return this.http.put(API_KEY + 'user/' + id, user);
  }

  createUser(user: CreateUserModel) {
    return this.http.post<CreateUserModel>(API_KEY + 'user', user);
  }

  deleteUser(id: number) {
    return this.http.delete(API_KEY + 'user/' + id);
  }

  contactAdmin(data: ContactAdminModel): Observable<any> {
    return this.http.post(API_KEY + 'user/contact-admin', {
      email: data.email,
      title: data.title,
      body: data.body,
    });
  }
}
