import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService } from './http-client.service';
import { FileUploadService } from './file-upload.service';
import { SearchModel } from '../models/search.model';

import { Servidor } from '../models/servidor.model';

import { environment } from '../../../environments/environment';

@Injectable()
export class ServidorService {

  constructor(
    private httpClientService: HttpClientService,
    private fileUploadService: FileUploadService,
  ) { }

  getAll(): Observable<Servidor[]> {
    return this.httpClientService.search('/servidores', new SearchModel({
      fields: ['id', 'nome', 'dataNascimento', 'sexo', 'estadoCivil', 'numeroFuncional', 'estado', 'cidade', 'nacionalidade', 'email', 'foto', 'admin'],
      orderBy: ['nome asc'],
    })).map((res: Response) => this.jsonToServidores(res.json() || []));
  }


  getByPesquisa(nome: string, instituicao: string, cargo: string, funcao: string, orgao: string, setor: string, limite: number, offset: number): Observable<Servidor[]> {
    return this.httpClientService.search('/servidores', new SearchModel({
      // fields: ['numeroFuncional', 'funcao.nome', 'funcao.orgao', 'habilidade.nome', 'funcao.dataInicio', 'cargo.nome', 'cargo.dataInicio', 'nome', 'id', 'sexo', 'estadoCivil', 'estado', 'cidade', 'email', 'foto'],
      fields: ['numeroFuncional', 'funcao.nome', 'habilidade.nome', 'funcao.dataInicio', 'cargo.nome', 'cargo.dataInicio', 'nome', 'id', 'sexo', 'estadoCivil', 'estado', 'cidade', 'email', 'foto'],
      limit: limite,
      offset: offset,
      filters: ['nome like %' + nome + '%', (orgao.length > 0 ? 'funcao.orgao.nome like %' + orgao + '%' : ''), (cargo.length > 0 ? 'cargo.nome like %' + cargo + '%' : ''), (funcao.length > 0 ? 'funcao.nome like %' + funcao + '%' : ''), (setor.length > 0 ? 'cargo.setor like %' + setor + '%' : '')],
      orderBy: ['nome asc, cargo.dataInicio desc, funcao.dataInicio desc'],
    })).map((res: Response) => this.jsonToServidores(res.json() || []));
  }
  
    getByPesquisa2(nome: string, instituicao: string, cargo: string, orgao: string, setor: string, limite: number, offset: number): Observable<Servidor[]> {
    return this.httpClientService.get('/servidores2?nome='+nome + '&instituicao=' + instituicao + '&cargo=' + cargo + '&orgao='+orgao+'&setor='+setor)
      .map((res: Response) => this.jsonToServidores(res.json() || []));
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
    return s.id ? this.update(s) : this.create(s);
  }

  updateImg(id: number, file: File) {
    return this.fileUploadService.uploadFile(`/servidores/${id}/foto`, 'foto', file)
      .map((res: Response) => res.json() || {});
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
