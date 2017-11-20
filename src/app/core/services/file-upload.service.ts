import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class FileUploadService {

  backendServerPath: string;

  constructor(
    private http: Http,
  ) {
    const path: string = environment.backendServerPath;
    this.backendServerPath = path.endsWith('/') ? path.slice(0, -1) : path;
  }

  uploadFile(path: string, paramName: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(paramName, file, file.name);
    return this.http.post(this.backendServerPath + path, formData);
  }
}
