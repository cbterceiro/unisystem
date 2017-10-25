import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServidorService } from '../core/servidor.service';
import { Servidor } from '../core/servidor.model';

@Component({
  selector: 'uns-servidores',
  templateUrl: 'servidores.component.html',
  // styleUrls: ['servidores.component.css']
})
export class ServidoresComponent implements OnInit {

  servidores: Servidor[];

  instituicao: string;
  nomeCompleto: string;
  cargo: string;
  funcao: string;
  areaInteresse: string;
  limite: number;
  offset: number;

  isLoading: boolean;

  constructor(
    private servidorService: ServidorService,
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.nomeCompleto = params.nome;
        this.instituicao = params.instituicao;
        this.cargo = params.cargo;
        this.funcao = params.funcao;
        this.areaInteresse = params.interesse;

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
    this.servidorService.getByPesquisa(
      this.nomeCompleto, this.instituicao, this.cargo, this.funcao, this.areaInteresse, this.limite, this.offset
    ).subscribe(servidores => {
      this.servidores = servidores;
      this.isLoading = false;
    });
  }
}
