import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './apis/api.service';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(private apiservice: ApiService) {}

  getByIdBlob(id: number): Observable<Blob> {
    return this.apiservice.getResourceForDownloadById(id);
  }

  uploadFile(file: FormData): Observable<number> {
    return this.apiservice.createResource(file);
  }
}
