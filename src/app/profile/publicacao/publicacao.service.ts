import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService, SearchModel } from '../../core';

import { Publicacao } from './publicacao.model';

@Injectable()
export class PublicacaoService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  getAll(id: number): Observable<Publicacao[]> {
    return this.httpClientService.get(`/servidores/${id}/publicacao`)
      // .map((res: Response) => this.jsonToFormacoesAcademicas(res.json() || []));
      .map((res: Response) => res.json() || []);
  }

  getById(id: number): Observable<Publicacao> {
    return this.httpClientService.get(`/publicacao/${id}`)
      .map((res: Response) => res.json() || {});
  }

  delete(id: number): Observable<any> {
    return this.httpClientService.delete(`/publicacao/${id}`)
      .map((res: Response) => res.json() || {});
  }

  save(publicacao: Publicacao): Observable<any> {
    return publicacao.id ? this.update(publicacao) : this.create(publicacao);
  }

  private create(publicacao: Publicacao): Observable<any> {
    return this.httpClientService.post('/publicacao', publicacao)
      .map((res: Response) => res.json());
  }

  private update(publicacao: Publicacao): Observable<any> {
    return this.httpClientService.put(`/publicacao/${publicacao.id}`, publicacao)
      .map((res: Response) => res.json());
  }

  // private jsonToFormacaoAcademica(json: any): Publicacao {
  //   const formacaoAcademica: Publicacao = Object.assign(new Publicacao(), json);
  //   if (json.dataInicio) {
  //     formacaoAcademica.dataInicio = new Date(json.dataInicio);
  //   }
  //   if (json.dataFim) {
  //     formacaoAcademica.dataFim = new Date(json.dataFim);
  //   }
  //   delete formacaoAcademica['created_at'];
  //   delete formacaoAcademica['updated_at'];
  //   return formacaoAcademica;
  // }

  // private jsonToFormacoesAcademicas(json: any[]): FormacaoAcademica[] {
  //   return json.map(fa => this.jsonToFormacaoAcademica(fa));
  // }
}
