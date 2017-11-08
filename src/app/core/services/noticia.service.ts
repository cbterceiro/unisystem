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
      fields: ['id', 'titulo', 'conteudo', 'imgDestaque'],
    })).map((res: Response) => this.jsonToNoticias(res.json() || []));
  }

  create(noticia: Noticia): Observable<number> {
    return this.httpClientService.post('/noticias', noticia)
      .map((res: Response) => res.json().id);
  }

  updateImgDestaque(): Observable<boolean> {
    //return this.
    return null;
  }


  private jsonToNoticia(json: any): Noticia {
    const noticia: Noticia = Object.assign(new Noticia(), json);
    return noticia;
  }

  private jsonToNoticias(json: any[]): Noticia[] {
    return json.map(obj => this.jsonToNoticia(obj));
  }
}
