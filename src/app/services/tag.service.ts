import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTagModel } from '../Models/Dtos/CreateTagModel';
import { TagModel } from '../Models/Dtos/TagModel';
import { ApiService } from './apis/api.service';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private apiService: ApiService) {}

  getAllTags(): Observable<Array<TagModel>> {
    return this.apiService.getAllTags();
  }

  createTag(data: CreateTagModel): Observable<number> {
    return this.apiService.createTag(data);
  }

  deleteTag(id: number): Observable<void> {
    return this.apiService.deleteTag(id);
  }
}
