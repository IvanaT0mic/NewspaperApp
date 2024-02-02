import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentModel } from '../Models/Dtos/CommentModel';
import { CreateComment } from '../Models/Dtos/CreateComment';
import { ApiService } from './apis/api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private apiService: ApiService) {}

  getAllByArticleId(id: number): Observable<Array<CommentModel>> {
    return this.apiService.getAllCommentsByArticleId(id);
  }

  deleteById(id: number): Observable<void> {
    return this.apiService.deleteComment(id);
  }

  createComment(data: CreateComment): Observable<number> {
    return this.apiService.createComment(data);
  }
}
