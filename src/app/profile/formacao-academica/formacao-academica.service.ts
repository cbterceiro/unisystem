import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../core';

import { FormacaoAcademica } from './formacao-academica.model';

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
