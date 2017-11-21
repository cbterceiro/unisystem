import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServidorService, Servidor } from '../core';

@Component({
  selector: 'uns-servidores',
  templateUrl: 'servidores.component.html',
  styleUrls: ['servidores.component.css']
})
export class ServidoresComponent implements OnInit {

  servidores: Servidor[];

  instituicao: string;
  nomeCompleto: string;
  cargo: string;
  orgao: string;
  setor: string;
  limite: number;
  offset: number;
  funcao: string;

  isLoading: boolean;
  defaultImageUrl: string = '/assets/img/default-user-icon.png';

  constructor(
    private servidorService: ServidorService,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.nomeCompleto = params.nome;
        this.instituicao = params.instituicao;
        this.cargo = params.cargo;
        this.orgao = params.orgao;
        this.setor = params.setor;
        this.funcao = '';
        this.limite = 10;
        this.offset = 0;
        this.searchServidores();
      });
  }

  updateBackgroundImage(base64Img: string) {
    const element = this.el.nativeElement.querySelector('.profile-image');
    if (base64Img && element) {
      this.renderer.setStyle(element, 'background-image', `url('${base64Img}')`);
    }
  }

  searchServidores(): void {
    this.isLoading = true;
  /*  this.servidorService.getByPesquisa(
      this.nomeCompleto, this.instituicao, this.cargo, this.funcao, this.orgao, this.setor, this.limite, this.offset
    ).subscribe(servidores => {
      this.servidores = servidores;
      this.isLoading = false;
    });*/
        this.servidorService.getByPesquisa2(
      this.nomeCompleto, this.instituicao, this.cargo, this.orgao, this.setor, this.limite, this.offset
    ).subscribe(servidores => {
      console.log(servidores);
      this.servidores = servidores;
      this.isLoading = false;
    });
  }

  redirectToServidorDetalhe(id: number): void {
    this.router.navigate([id, 'detalhe'], { relativeTo: this.route });
  }
}
