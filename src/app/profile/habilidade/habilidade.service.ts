import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../core';

import { Habilidade } from './habilidade.model';
/*import { Setor } from './setor.model';*/

@Injectable()
export class HabilidadeService {

  constructor(
    private httpClientService: HttpClientService,
  ) { }


  getAllHabilidadesFromId(id: number): Observable<Habilidade[]> {
    return this.httpClientService.get(`/servidores/${id}/habilidade`)
      .map((res: Response) => res.json() || []);
  }
  
    getAllHabilidades(): Observable<Habilidade[]> {
    return this.httpClientService.get('/habilidade')
      .map((res: Response) => res.json() || []);
  }
  
  getAllHabilidadesContains(habilidade: string): Observable<Habilidade[]> {
    //return this.httpClientService.get('/habilidade')
     // .map((res: Response) => res.json() || []);
     return new Observable<Habilidade[]>();
  }
  
  searchHabilidades(nome: string): Observable<Habilidade[]> {
    return this.httpClientService.get(`/habilidade/nome/${nome}`)
      .map((res: Response) => res.json().map(h => h.nome) || {});
  }
  

  savehabilidade(habilidade: Habilidade): Observable<any> {
    return habilidade.id ? this.updatehabilidade(habilidade) : this.create(habilidade);
  }
  
    private updatehabilidade(habilidade: Habilidade): Observable<any> {
    return this.httpClientService.put(`/habilidade/${habilidade.id}`, habilidade)
      .map((res: Response) => res.json());
  }
  
  recomendarHabilidade(habilidade: Habilidade, idLogado: number): Observable<any> {
    return this.httpClientService.post(`/habilidade/${habilidade.id}/recomendacao/${idLogado}`, {})
        .map((res: Response) => res.json() || {});
  }
  
  removerRecomendacaoHabilidade(habilidade: Habilidade, idLogado: number): Observable<any> {
    return this.httpClientService.delete(`/habilidade/${habilidade.id}/recomendacao/${idLogado}`)
       .map((res: Response) => res.json() || {});
  }
  
    private create(habilidade: Habilidade): Observable<any> {
    return this.httpClientService.post('/habilidade', habilidade)
      .map((res: Response) => res.json());
  }
  
  delete(id: number): Observable<any> {
    return this.httpClientService.delete(`/habilidade/${id}`)
      .map((res: Response) => res.json() || {});
  }
  

}
