import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService, SearchModel } from '../../core';

import { Certificacao } from './certificacao.model';

@Injectable()
export class CertificacaoService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  getAll(id: number): Observable<Certificacao[]> {
    return this.httpClientService.get(`/servidores/${id}/certificacoes`)
      .map((res: Response) => res.json() || []);
  }

  getById(id: number): Observable<Certificacao> {
    return this.httpClientService.get(`/certificacoes/${id}`)
      .map((res: Response) => res.json() || {});
  }

  delete(id: number): Observable<any> {
    return this.httpClientService.delete(`/certificacoes/${id}`)
      .map((res: Response) => res.json() || {});
  }

  save(certificacao: Certificacao): Observable<any> {
    return certificacao.id ? this.update(certificacao) : this.create(certificacao);
  }

  private create(certificacao: Certificacao): Observable<any> {
    return this.httpClientService.post('/certificacoes', certificacao)
      .map((res: Response) => res.json());
  }

  private update(certificacao: Certificacao): Observable<any> {
    return this.httpClientService.put(`/certificacoes/${certificacao.id}`, certificacao)
      .map((res: Response) => res.json());
  }
  
  searchEntidades(entidade: string): Observable<string[]> {
    return this.httpClientService.search(`/certificacoes/pesquisa`, new SearchModel({
      fields: ['entidade'],
      filters: [`entidade like %${entidade}%`]
    })).map((res: Response) => (res.json() || []).map(c => c.entidade));
  }
}
