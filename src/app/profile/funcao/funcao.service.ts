import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../core';

import { Funcao } from './funcao.model';
/*import { Setor } from './setor.model';*/

@Injectable()
export class FuncaoService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }


  getAllFuncoesFromId(id: number): Observable<Funcao[]> {
    return this.httpClientService.get(`/servidores/${id}/funcao`)
      .map((res: Response) => res.json() || []);
  }
  
    getAllFuncoes(): Observable<Funcao[]> {
    return this.httpClientService.get('/funcao')
      .map((res: Response) => res.json() || []);
  }
  
  /*  getAllSetores(): Observable<Setor[]> {
    return this.httpClientService.get('/setor')
      .map((res: Response) => res.json() || []);
  }*/
  
  getAllFuncoesContains(funcao: string): Observable<Funcao[]> {
    //return this.httpClientService.get('/funcao')
     // .map((res: Response) => res.json() || []);
     return new Observable<Funcao[]>();
  }
  
  /*
    getAllSetoresContains(funcao: string): Observable<Setor[]> {
    //return this.httpClientService.get('/funcao')
     // .map((res: Response) => res.json() || []);
     return new Observable<Setor[]>();
  }*/
   
  saveFuncao(funcao: Funcao): Observable<any> {
    return funcao.id ? this.updatefuncao(funcao) : this.create(funcao);
  }
  
    private updatefuncao(funcao: Funcao): Observable<any> {
    return this.httpClientService.put(`/funcao/${funcao.id}`, funcao)
      .map((res: Response) => res.json());
  }
  
    private create(funcao: Funcao): Observable<any> {
    return this.httpClientService.post('/funcao', funcao)
      .map((res: Response) => res.json());
  }
  
  delete(id: number): Observable<any> {
    return this.httpClientService.delete(`/funcao/${id}`)
      .map((res: Response) => res.json() || {});
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
