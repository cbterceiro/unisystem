import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../core';

import { Capacitacao } from './capacitacao.model';


@Injectable()
export class CapacitacaoService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  getAll(id: number): Observable<Capacitacao[]> {
    return this.httpClientService.get(`/servidores/${id}/atividades-complementares`)
      .map((res: Response) => res.json() || []);
  }

  getById(id: number): Observable<Capacitacao> {
    return this.httpClientService.get(`/atividades-complementares/${id}`)
      .map((res: Response) => res.json() || {});
  }

  delete(id: number): Observable<any> {
    return this.httpClientService.delete(`/atividades-complementares/${id}`)
      .map((res: Response) => res.json() || {});
  }

  save(Capacitacao: Capacitacao): Observable<any> {
    return Capacitacao.id ? this.update(Capacitacao) : this.create(Capacitacao);
  }

  private create(Capacitacao: Capacitacao): Observable<any> {
    return this.httpClientService.post('/atividades-complementares', Capacitacao)
      .map((res: Response) => res.json());
  }

  private update(Capacitacao: Capacitacao): Observable<any> {
    return this.httpClientService.put(`/atividades-complementares/${Capacitacao.id}`, Capacitacao)
      .map((res: Response) => res.json());
  }
}
