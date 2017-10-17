import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService, SearchModel } from '../../core';

import { Cargo } from './cargo.model';
import { Setor } from './setor.model';

@Injectable()
export class CargoService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  getCargosByServidorId(id: number): Observable<Cargo[]> {
    return this.httpClientService.get(`/servidores/${id}/cargo`)
      .map((res: Response) => this.jsonToCargos(res.json() || []));
  }

  searchCargos(name: string): Observable<string[]> {
    return this.httpClientService.search(`/cargos/pesquisa`, new SearchModel({
      fields: ['nome'],
      filters: [`nome like %${name}%`]
    })).map((res: Response) => (res.json() || []).map(c => c.nome));
  }

  getAllSetores(): Observable<Setor[]> {
    return this.httpClientService.get('/setor')
      .map((res: Response) => res.json() || []);
  }

  getAllSetoresContains(cargo: string): Observable<Setor[]> {
    // return this.httpClientService.get('/cargo')
    // .map((res: Response) => res.json() || []);
    return new Observable<Setor[]>();
  }

  save(cargo: Cargo): Observable<any> {
    return cargo.id ? this.update(cargo) : this.create(cargo);
  }

  private update(cargo: Cargo): Observable<any> {
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

  private jsonToCargo(json: any): Cargo {
    const cargo: Cargo = Object.assign(new Cargo(), json);
    if (json.dataInicio) {
      cargo.dataInicio = new Date(json.dataInicio);
    }
    if (json.dataFim) {
      cargo.dataFim = new Date(json.dataFim);
    }
    delete cargo['created_at'];
    delete cargo['updated_at'];
    return cargo;
  }

  private jsonToCargos(json: any[]): Cargo[] {
    return json.map(obj => this.jsonToCargo(obj));
  }
}
