import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleExtendedModel } from 'src/app/Models/Dtos/ArticleExtendedModel';
import { ArticleModel } from 'src/app/Models/Dtos/ArticleModel';
import { CommentModel } from 'src/app/Models/Dtos/CommentModel';
import { ContactAdminModel } from 'src/app/Models/Dtos/ContantAdminModel';
import { CreateTagModel } from 'src/app/Models/Dtos/CreateTagModel';
import { CreateUserModel } from 'src/app/Models/Dtos/CreateUserModel';
import { LoginModel } from 'src/app/Models/Dtos/LoginModel';
import { LoginResponseModel } from 'src/app/Models/Dtos/LoginResponseModel';
import { ResourceInfoModel } from 'src/app/Models/Dtos/ResourceInfoModel';
import { TagModel } from 'src/app/Models/Dtos/TagModel';
import { UpdateUserModel } from 'src/app/Models/Dtos/UpdateUserModel';
import { UserExtendedModel } from 'src/app/Models/Dtos/UserExtendedModel';
import { UserModel } from 'src/app/Models/Dtos/UserModel';
import { CreateArticleModel } from './../../Models/Dtos/CreateArticleModel';
import { CreateComment } from './../../Models/Dtos/CreateComment';

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

  getAllArticles(): Observable<Array<ArticleModel>> {
    return this.http.get<Array<ArticleModel>>(API_KEY + 'article');
  }

  getAllArticlesByStatus(status: number): Observable<Array<ArticleModel>> {
    return this.http.get<Array<ArticleModel>>(
      API_KEY + 'article/status?status=' + status
    );
  }

  getArticleById(id: number): Observable<ArticleExtendedModel> {
    return this.http.get<ArticleExtendedModel>(API_KEY + 'article/' + id);
  }

  createArticle(data: CreateArticleModel): Observable<number> {
    return this.http.post<number>(API_KEY + 'article', data);
  }

  getAllPrivateByUserId(id: number): Observable<Array<ArticleModel>> {
    return this.http.get<Array<ArticleModel>>(API_KEY + 'article/user/' + id);
  }

  updateArticle(id: number, data: CreateArticleModel): Observable<boolean> {
    return this.http.put<boolean>(API_KEY + 'article/' + id, data);
  }

  publichArticleById(id: number): Observable<boolean> {
    return this.http.put<boolean>(API_KEY + 'article/public/' + id, {});
  }

  deleteArticle(id: number): Observable<boolean> {
    return this.http.delete<boolean>(API_KEY + 'article/' + id);
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

  getResourceForDownloadById(id: number): Observable<Blob> {
    return this.http.get(API_KEY + 'resource/download/' + id, {
      responseType: 'blob',
    });
  }

  //TagController
  getAllTags(): Observable<Array<TagModel>> {
    return this.http.get<Array<TagModel>>(API_KEY + 'tag');
  }

  getTagById(id: number): Observable<TagModel> {
    return this.http.get<TagModel>(API_KEY + 'tag/' + id);
  }

  deleteTag(id: number): Observable<void> {
    return this.http.delete<void>(API_KEY + 'tag/' + id);
  }

  createTag(tag: CreateTagModel): Observable<number> {
    return this.http.post<number>(API_KEY + 'tag', tag);
  }

  //CommentController

  getAllCommentsByArticleId(id: number): Observable<Array<CommentModel>> {
    return this.http.get<Array<CommentModel>>(
      API_KEY + 'comment/article/' + id
    );
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(API_KEY + 'comment/' + id);
  }

  createComment(data: CreateComment): Observable<number> {
    return this.http.post<number>(API_KEY + 'comment', data);
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
