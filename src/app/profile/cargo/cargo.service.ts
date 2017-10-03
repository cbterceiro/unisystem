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


  getAllCargosFromId(id: number): Observable<Cargo[]> {
    return this.httpClientService.get(`/servidores/${id}/cargo`)
      .map((res: Response) => res.json() || []);
  }
  
    getAllFuncoes(): Observable<Funcao[]> {
    return this.httpClientService.get('/cargo')
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
   
  saveCargo(cargo: Cargo): Observable<any> {
    return cargo.id ? this.updateCargo(cargo) : this.create(cargo);
  }
  
    private updateCargo(cargo: Cargo): Observable<any> {
    return this.httpClientService.put(`/cargo/${cargo.id}`, cargo)
      .map((res: Response) => res.json());
  }
  
    private create(cargo: Cargo): Observable<any> {
    return this.httpClientService.post('/cargo', cargo)
      .map((res: Response) => res.json());
  }
  
  delete(id: number): Observable<any> {
    return this.httpClientService.delete(`/cargo/${id}`)
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
