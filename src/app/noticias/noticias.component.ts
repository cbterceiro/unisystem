import { Component, OnInit } from '@angular/core';

import { Noticia, NoticiaService } from '../core';
import { AuthenticatedUserService } from '../authentication';

@Component({
  selector: 'uns-noticias',
  templateUrl: 'noticias.component.html',
  styleUrls: ['noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticias: Noticia[] = [];
  isLoading: boolean;
  isAdmin: boolean;
  
  constructor(
    private noticiaService: NoticiaService,
    private authenticatedUserService: AuthenticatedUserService,
  ) { }

  ngOnInit() {
    this.getNoticias();
    
    const servidor = this.authenticatedUserService.getServidor();
    this.isAdmin = servidor.admin == 1;
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
