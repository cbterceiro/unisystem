import { Component, OnInit } from '@angular/core';

import { Noticia, NoticiaService } from '../core';

@Component({
  selector: 'uns-noticias',
  templateUrl: 'noticias.component.html',
  styleUrls: ['noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticias: Noticia[] = [];
  isLoading: boolean;

  constructor(
    private noticiaService: NoticiaService,
  ) { }

  ngOnInit() {
    this.getNoticias();
  }

  getNoticias() {
    this.noticias = [];
    this.isLoading = true;
    this.noticiaService.getNoticias().subscribe(noticias => {
      this.noticias = noticias;
      this.isLoading = false;
    });
  }
}
