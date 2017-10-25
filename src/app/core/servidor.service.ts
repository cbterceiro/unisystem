import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService } from './http-client.service';
import { SearchModel } from './search.model';

import { Servidor } from './servidor.model';

import { environment } from '../../environments/environment';

@Injectable()
export class ServidorService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  getAll(): Observable<Servidor[]> {
    return this.httpClientService.search('/servidores', new SearchModel({
      fields: ['id', 'nome', 'dataNascimento', 'sexo', 'estadoCivil', 'numeroFuncional', 'estado', 'cidade', 'nacionalidade', 'email', 'foto'],
      orderBy: ['nome asc'],
    })).map((res: Response) => this.jsonToServidores(res.json() || []));
  }

  getByPesquisa(nome: string, instituicao: string, cargo: string, funcao: string, habilidades: string, limite: number, offset: number): Observable<Servidor[]> {

    return this.httpClientService.search('/servidores', new SearchModel({
      fields: ['numeroFuncional','funcao.nome', 'habilidade.nome', 'funcao.dataInicio', 'cargo.nome', 'cargo.dataInicio', 'nome', 'id', 'sexo', 'estadoCivil', 'estado', 'cidade', 'email', 'foto'],
      limit:limite,
      offset:offset,
      filters:['nome like %'+nome+'%', (cargo.length > 0 ? 'cargo.nome like %'+cargo+'%' : ''), (funcao.length > 0 ? 'funcao.nome like %'+funcao+'%' : ''), (habilidades.length > 0 ? 'habilidade.nome like %'+habilidades+'%' : '')],
      orderBy: ['nome asc, cargo.dataInicio desc, funcao.dataInicio desc'],
    })).map((res: Response) => this.jsonToServidores(res.json() || []));
    
   // console.log(`/servidores/pesquisa?fields=nome, id, foto, sexo, estadoCivil, estado, cidade, email&limit=${limite}&offset=${offset}&filter=nome like %${nome}%&order=nome asc`);
  //  return this.httpClientService.get(`/servidores/pesquisa?fields=nome, id, foto, sexo, estadoCivil, estado, cidade, email&limit=${limite}&offset=${offset}&filter=nome like %${nome}%&order=nome asc`)
    //  .map((res: Response) => this.jsonToServidores(res.json() || {}));
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
    const s: Servidor = Object.assign({}, servidor);
    delete s.foto;
    console.log('>>>>', s);
    return s.id ? this.update(s) : this.create(s);
  }

  getImageUrl(id: number): string {
    const path = environment.backendServerPath;
    const backendServerPath = path.endsWith('/') ? path.slice(0, -1) : path;
    return `${backendServerPath}/servidores/${id}/foto`;
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
