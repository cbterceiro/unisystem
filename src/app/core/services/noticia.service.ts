import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService } from './http-client.service';
import { FileUploadService } from './file-upload.service';

import { Noticia } from '../models/noticia.model';
import { NoticiaExterna } from '../models/noticia-externa.model';
import { SearchModel } from '../models/search.model';

@Injectable()
export class NoticiaService {

  constructor(
    private httpClientService: HttpClientService,
    private fileUploadService: FileUploadService,
  ) { }

  getNoticiasExternas(): Observable<NoticiaExterna[]> {
    return this.httpClientService.get('/noticias-externas')
      .map((res: Response) => res.json() || []);
  }

  getNoticias(): Observable<Noticia[]> {
    return this.httpClientService.search('/noticias', new SearchModel({
      fields: ['id', 'titulo', 'conteudo', 'imgDestaque', 'dataCriacao', 'dataAtualizacao', 'servidor.id'],
      orderBy: ['created_at desc']
    })).map((res: Response) => this.jsonToNoticias(res.json() || []));
  }

  create(noticia: Noticia, idServidor: number): Observable<number> {
    noticia['servidor_id'] = idServidor;
    return this.httpClientService.post(`/noticias`, noticia)
      .map((res: Response) => res.json().id);
  }

  update(noticia: Noticia, idServidor: number): Observable<boolean> {
    noticia['servidor_id'] = idServidor;
    return this.httpClientService.put(`/noticias/${noticia.id}`, noticia)
      .map((res: Response) => res.ok);
  }

  updateImgDestaque(id: number, file: File): Observable<boolean> {
    return this.fileUploadService.uploadFile(`/noticias/${id}/foto`, 'foto', file)
      .map((res: Response) => res.json() || {});
  }

  delete(idNoticia: number): Observable<boolean> {
    return this.httpClientService.delete(`/noticias/${idNoticia}`)
      .map((res: Response) => res.ok);
  }

  private jsonToNoticia(json: any): Noticia {
    const noticia: Noticia = Object.assign(new Noticia(), json);
    return noticia;
  }

  private jsonToNoticias(json: any[]): Noticia[] {
    return json.map(obj => this.jsonToNoticia(obj));
  }
}
