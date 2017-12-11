import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ConfirmationService } from 'primeng/primeng';

import { Noticia, NoticiaService } from '../core';
import { AuthenticatedUserService } from '../authentication';
import { NoticiaFormComponent } from './noticia-form.component';

@Component({
  selector: 'uns-noticias',
  templateUrl: 'noticias.component.html',
  styleUrls: ['noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticias: Noticia[] = [];
  isLoading: boolean;
  isAdmin: boolean;
  idServidor: number;

  @ViewChild('noticiasTitleCard') noticiasTituloCard: ElementRef;
  @ViewChild('noticiaForm') noticiaForm: NoticiaFormComponent;

  limite: number[] = [];
  lerMais: boolean[] = [];

  constructor(
    private noticiaService: NoticiaService,
    private authenticatedUserService: AuthenticatedUserService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.getNoticias();

    const servidor = this.authenticatedUserService.getServidor();
    console.log('admin: ' + servidor.admin);
    this.isAdmin = servidor.admin === 1;
    this.idServidor = servidor.id;
  }

  getNoticias() {
    this.noticias = [];
    this.isLoading = true;
    this.noticiaService.getNoticias().subscribe(noticias => {
      this.noticias = noticias;
      this.isLoading = false;
      for (let n = 0; n < noticias.length; n++) {
        this.limite[n] = 200;
      }
    });
  }

  editarNoticia(noticia: Noticia) {
    this.noticiaForm.startEdit(noticia);
    this.scrollToTop();
  }

  removerNoticia(idNoticia: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esta notícia?',
      accept: () => {
        this.noticiaService.delete(idNoticia).subscribe(ok => {
          this.getNoticias();
          this.scrollToNoticiasCard();
        });
      },
      reject: () => this.scrollToNoticiasCard()
    });
  }

  isDono(idServidorNoticia: number): boolean {
    return this.idServidor === idServidorNoticia;
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  scrollToNoticiasCard() {
    this.noticiasTituloCard.nativeElement.scrollIntoView(true);
    window.scrollBy(0, -50);
  }
}
