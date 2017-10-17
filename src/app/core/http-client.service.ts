import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

import { SearchModel } from './search.model';

@Injectable()
export class HttpClientService {

  private backendServerPath: string;

  constructor(
    private http: Http,
  ) {
    const path: string = environment.backendServerPath;
    this.backendServerPath = path.endsWith('/') ? path.slice(0, -1) : path;
  }

  get(path: string): Observable<Response> {
    return this.http.get(this.backendServerPath + path, {
      // headers:
    });
  }

  search(path: string, searchModel: SearchModel): Observable<Response> {
    console.log('url:', this.backendServerPath + path + searchModel.toString());
    return this.http.get(this.backendServerPath + path + searchModel.toString(), {
      // headers:
    });
  }

  put(path: string, body: any): Observable<Response> {
    return this.http.put(this.backendServerPath + path, body, {
      // headers:
    });
  }

  post(path: string, body: any): Observable<Response> {
    return this.http.post(this.backendServerPath + path, body, {
      // headers:
    });
  }

  delete(path: string): Observable<Response> {
    return this.http.delete(this.backendServerPath + path, {
      // headers:
    });
  }
}
