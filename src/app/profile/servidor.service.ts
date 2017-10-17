import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../core';

import { Servidor } from './servidor.model';

@Injectable()
export class ServidorService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  getAll(): Observable<Servidor[]> {
    return this.httpClientService.get('/servidores')
      .map((res: Response) => this.jsonToServidores(res.json() || []));
  }

  getByName(name: string): Observable<Servidor> {
    return this.httpClientService.get(`/servidores/nome/${name}`)
      .map((res: Response) => this.jsonToServidor(res.json() || {}));
  }
  
    getByPesquisa(nome: string, instituicao: string, cargo :string, setor :string, interesse :string, limite:number, offset:number): Observable<Servidor[]> {
      console.log(`/servidores/pesquisa?fields=nome, id, foto, sexo, estadoCivil, estado, cidade, email&limit=${limite}&offset=${offset}&filter=nome like %${nome}%&order=nome asc`);
    return this.httpClientService.get(`/servidores/pesquisa?fields=nome, id, foto, sexo, estadoCivil, estado, cidade, email&limit=${limite}&offset=${offset}&filter=nome like %${nome}%&order=nome asc`)
      .map((res: Response) => this.jsonToServidores(res.json() || {}));
  }

  getById(id: number): Observable<Servidor> {
    return this.httpClientService.get(`/servidores/${id}`)
      .map((res: Response) => this.jsonToServidor(res.json() || {}));
  }

  delete(id: number): Observable<any> {
    return this.httpClientService.delete(`/servidores/${id}`)
      .map((res: Response) => res.json() || {});
  }

  save(servidor: Servidor): Observable<any> {
    return servidor.id ? this.update(servidor) : this.create(servidor);
  }

  private create(servidor: Servidor): Observable<any> {
    return this.httpClientService.post('/servidores', servidor)
      .map((res: Response) => res.json());
  }

  private update(servidor: Servidor): Observable<any> {
    return this.httpClientService.put(`/servidores/${servidor.id}`, servidor)
      .map((res: Response) => res.json());
  }

  private jsonToServidor(json: any): Servidor {
    const servidor: Servidor = Object.assign(new Servidor(), json);
    if (json.dataNascimento) {
      servidor.dataNascimento = new Date(json.dataNascimento);
    }
    delete servidor['created_at'];
    delete servidor['updated_at'];
    return servidor;
  }

  private jsonToServidores(json: any[]): Servidor[] {
    return json.map(obj => this.jsonToServidor(obj));
  }
}
