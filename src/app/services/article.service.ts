import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleModel } from '../Models/Dtos/ArticleModel';
import { CreateArticleModel } from './../Models/Dtos/CreateArticleModel';
import { ApiService } from './apis/api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  // Article statuses
  //PRIVATE(1),
  // IN_COMPANY(2),
  // PUBLIC(3);

  constructor(private apiService: ApiService) {}

  getAllArticles(): Observable<Array<ArticleModel>> {
    return this.apiService.getAllArticles();
  }

  getAllPublishedArticles(): Observable<Array<ArticleModel>> {
    return this.apiService.getAllArticlesByStatus(3);
  }

  getAllPrivateArticle(): Observable<Array<ArticleModel>> {
    return this.apiService.getAllArticlesByStatus(1);
  }

  getById(id: number): Observable<ArticleModel> {
    return this.apiService.getArticleById(id);
  }

  createArtile(data: CreateArticleModel): Observable<number> {
    return this.apiService.createArticle(data);
  }

  getAllPrivateByUserId(id: number): Observable<Array<ArticleModel>> {
    return this.apiService.getAllPrivateByUserId(id);
  }

  publishArticleById(id: number): Observable<Boolean> {
    return this.apiService.publichArticleById(id);
  }
}
