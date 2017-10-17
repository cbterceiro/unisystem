import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../core';

import { FormacaoAcademica } from './formacao-academica.model';
import { InstituicaoAcademica } from './instituicao-academica.model';

@Injectable()
export class FormacaoAcademicaService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  getAll(id: number): Observable<FormacaoAcademica[]> {
    return this.httpClientService.get(`/servidores/${id}/formacaoacademica`)
      .map((res: Response) => res.json() || []);
  }

  getById(id: number): Observable<FormacaoAcademica> {
    return this.httpClientService.get(`/formacaoacademica/${id}`)
      .map((res: Response) => res.json() || {});
  }

  searchInstituicao(nome: string): Observable<InstituicaoAcademica[]> {
    return this.httpClientService.get(`/instituicoes-academicas/nome/${nome}`)
      .map((res: Response) => res.json() || {});
  }

  // pesquisar cursos para exibir no autocomplete
  searchCurso(nome: string): Observable<any> {
    return this.httpClientService.get(`/cursos?fields=nome&limit=10&offset=0&filter=nome like %${nome}%&order=nome asc`)//confirmar
      .map((res: Response) => res.json() || {});
  }

  delete(id: number): Observable<any> {
    return this.httpClientService.delete(`/formacaoacademica/${id}`)
      .map((res: Response) => res.json() || {});
  }

  save(formacaoAcademica: FormacaoAcademica): Observable<any> {
    return formacaoAcademica.id ? this.update(formacaoAcademica) : this.create(formacaoAcademica);
  }

  private create(formacaoacademica: FormacaoAcademica): Observable<any> {
    return this.httpClientService.post('/formacaoacademica', formacaoacademica)
      .map((res: Response) => res.json());
  }

  private update(formacaoacademica: FormacaoAcademica): Observable<any> {
    return this.httpClientService.put(`/formacaoacademica/${formacaoacademica.id}`, formacaoacademica)
      .map((res: Response) => res.json());
  }
}
