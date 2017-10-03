import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../core';

import { Noticia } from './noticia.model';

@Injectable()
export class NoticiaService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  getNoticias(): Observable<Noticia[]> {
    return this.httpClientService.get('/noticias')
      .map((res: Response) => res.json() || []);
  }
}
