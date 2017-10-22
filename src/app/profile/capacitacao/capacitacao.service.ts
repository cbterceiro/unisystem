import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService, SearchModel } from '../../core';

import { Capacitacao } from './capacitacao.model';

@Injectable()
export class CapacitacaoService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  getAll(id: number): Observable<Capacitacao[]> {
    return this.httpClientService.get(`/servidores/${id}/atividades-complementares`)
      .map((res: Response) => this.jsonToCapacitacoes(res.json() || []));
  }

  getById(id: number): Observable<Capacitacao> {
    return this.httpClientService.get(`/atividades-complementares/${id}`)
      .map((res: Response) => this.jsonToCapacitacao(res.json() || {}));
  }

  delete(id: number): Observable<any> {
    return this.httpClientService.delete(`/atividades-complementares/${id}`)
      .map((res: Response) => res.json() || {});
  }

  save(Capacitacao: Capacitacao): Observable<any> {
    return Capacitacao.id ? this.update(Capacitacao) : this.create(Capacitacao);
  }

  searchEntidades(entidade: string): Observable<string[]> {
    return this.httpClientService.search(`/atividades-complementares/pesquisa`, new SearchModel({
      fields: ['entidade'],
      filters: [`entidade like %${entidade}%`]
    })).map((res: Response) => (res.json() || []).map(c => c.entidade));
  }

  private create(Capacitacao: Capacitacao): Observable<any> {
    return this.httpClientService.post('/atividades-complementares', Capacitacao)
      .map((res: Response) => res.json());
  }

  private update(Capacitacao: Capacitacao): Observable<any> {
    return this.httpClientService.put(`/atividades-complementares/${Capacitacao.id}`, Capacitacao)
      .map((res: Response) => res.json());
  }

  private jsonToCapacitacao(json: any): Capacitacao {
    const capacitacao: Capacitacao = Object.assign(new Capacitacao(), json);
    if (json.dataInicio) {
      capacitacao.dataInicio = new Date(json.dataInicio);
    }
    if (json.dataFim) {
      capacitacao.dataFim = new Date(json.dataFim);
    }
    delete capacitacao['created_at'];
    delete capacitacao['updated_at'];
    return capacitacao;
  }

  private jsonToCapacitacoes(json: any[]): Capacitacao[] {
    return json.map(obj => this.jsonToCapacitacao(obj));
  }
}
