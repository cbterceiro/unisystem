import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService, SearchModel } from '../../core';

import { Funcao } from './funcao.model';

@Injectable()
export class FuncaoService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  getFuncoesByServidorId(id: number): Observable<Funcao[]> {
    return this.httpClientService.get(`/servidores/${id}/funcao`)
      .map((res: Response) => this.jsonToFuncoes(res.json() || []));
  }

  searchFuncoes(name: string): Observable<string[]> {
    return this.httpClientService.search(`/funcoes/pesquisa`, new SearchModel({
      fields: ['nome'],
      filters: [`nome like %${name}%`]
    })).map((res: Response) => (res.json() || []).map(f => f.nome));
  }
  
    searchFuncoesCadastradas(name: string): Observable<string[]> {
    return this.httpClientService.search(`/funcoesCadastradas/pesquisa`, new SearchModel({
      fields: ['nome'],
      filters: [`nome like %${name}%`]
    })).map((res: Response) => (res.json() || []).map(f => f.nome));
  }

  getAllFuncoes(): Observable<Funcao[]> {
    return this.httpClientService.get('/funcao')
      .map((res: Response) => res.json() || []);
  }

  save(funcao: Funcao): Observable<any> {
    return funcao.id ? this.update(funcao) : this.create(funcao);
  }

  private update(funcao: Funcao): Observable<any> {
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

  private jsonToFuncao(json: any): Funcao {
    const funcao: Funcao = Object.assign(new Funcao(), json);
    if (json.dataInicio) {
      funcao.dataInicio = new Date(json.dataInicio);
    }
    if (json.dataFim) {
      funcao.dataFim = new Date(json.dataFim);
    }
    delete funcao['created_at'];
    delete funcao['updated_at'];
    return funcao;
  }

  private jsonToFuncoes(json: any[]): Funcao[] {
    return json.map(obj => this.jsonToFuncao(obj));
  }
}
