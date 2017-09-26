import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../core';

import { Servidor } from './servidor.model';

@Injectable()
export class ServidorService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  getAll(): Observable<Servidor[]> {
    return this.httpClientService.get('/servidores')
      .map((res: Response) => res.json() || []);
  }

  getById(id: number): Observable<Servidor> {
    return this.httpClientService.get(`/servidores/${id}`)
      .map((res: Response) => res.json() || {});
  }

  delete(id: number): Observable<any> {
    return this.httpClientService.delete(`/servidores/${id}`)
      .map((res: Response) => res.json() || {});
  }

  save(servidor: Servidor): Observable<any> {
    return servidor.id ? this.update(servidor) : this.create(servidor);
  }

  private create(servidor: Servidor): Observable<any> {
    return this.httpClientService.post('/servidores', servidor)
      .map((res: Response) => res.json());
  }

  private update(servidor: Servidor): Observable<any> {
    return this.httpClientService.put(`/servidores/${servidor.id}`, servidor)
      .map((res: Response) => res.json());
  }
}
