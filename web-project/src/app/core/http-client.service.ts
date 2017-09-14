import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable()
export class HttpClientService {

  private backendServerPath: string;

  constructor(
    private http: Http,
  ) {
    this.backendServerPath = environment.backendServerPath += environment.backendServerPath.endsWith('/') ? '' : '/';
  }

  get(path: string): Observable<Response> {
    return this.http.get(this.backendServerPath + path, {
      //headers:
    });
  }

  put(path: string, body: any): Observable<Response> {
    return this.http.put(this.backendServerPath + path, body, {
      //headers:
    });
  }

  post(path: string, body: any): Observable<Response> {
    return this.http.post(this.backendServerPath + path, body, {
      //headers:
    });
  }

  delete(path: string): Observable<Response> {
    return this.http.delete(this.backendServerPath + path, {
      //headers:
    });
  }
}
