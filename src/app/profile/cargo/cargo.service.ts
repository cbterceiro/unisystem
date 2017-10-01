import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../core';

import { Cargo } from './cargo.model';
import { Funcao } from './funcao.model';
import { Setor } from './setor.model';

@Injectable()
export class CargoService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  getAllCargos(): Observable<Cargo[]> {
    return this.httpClientService.get('/cargo')
      .map((res: Response) => res.json() || []);
  }
  
    getAllFuncoes(): Observable<Funcao[]> {
    return this.httpClientService.get('/funcao')
      .map((res: Response) => res.json() || []);
  }
  
    getAllSetores(): Observable<Setor[]> {
    return this.httpClientService.get('/setor')
      .map((res: Response) => res.json() || []);
  }
  
  getAllFuncoesContains(cargo: string): Observable<Funcao[]> {
    //return this.httpClientService.get('/cargo')
     // .map((res: Response) => res.json() || []);
     return new Observable<Funcao[]>();
  }
  
    getAllSetoresContains(cargo: string): Observable<Setor[]> {
    //return this.httpClientService.get('/cargo')
     // .map((res: Response) => res.json() || []);
     return new Observable<Setor[]>();
  }
/*
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
  */
}
