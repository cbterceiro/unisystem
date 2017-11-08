import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileUploadService {

  constructor(
    private http: Http,
  ) { }

  uploadFile(url: string, paramName: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(paramName, file, file.name);
    return this.http.post(url, formData);
  }
}
