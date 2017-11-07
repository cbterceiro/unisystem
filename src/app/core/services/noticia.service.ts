import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService } from './http-client.service';

import { Noticia } from '../models/noticia.model';

@Injectable()
export class NoticiaService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  getNoticias(): Observable<Noticia[]> {
    return this.httpClientService.get('/noticias-sege')
      .map((res: Response) => res.json() || []);
  }
}
