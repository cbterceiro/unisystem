import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServidorService, Servidor } from '../core'
import { delay } from '../shared/functions';

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
  habilidade: string;
  
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
        this.funcao = params.funcao;
        this.habilidade = params.habilidade;
        this.limite = 10;
        this.offset = 0;
        this.searchServidores();
      });
  }

  updateBackgroundImage(base64Img: string, id : number) {
    const element = this.el.nativeElement.querySelector('.servidor-foto-'+id);
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
      this.nomeCompleto, this.instituicao, this.cargo, this.orgao, this.setor, this.habilidade, this.funcao, this.limite, this.offset
    ).subscribe(servidores => {
      this.servidores = servidores;
      
      //Buscando imagem separada a query fica mais rápida...
            for (var i = 0, len = this.servidores.length; i < len; i++) {
              this.servidorService.getFotoById(this.servidores[i].id).subscribe(servidor => {
                  delay(_ => {
                    for (var i = 0, len = this.servidores.length; i < len; i++) {
                      if(this.servidores[i].id == servidor.id)
                      {
                        this.servidores[i].foto = servidor.foto;
                        break;
                      }
                    }
                    });
               }); 
              }
      
      this.isLoading = false;
    });
  }

  redirectToServidorDetalhe(id: number): void {
    this.router.navigate([id, 'detalhe'], { relativeTo: this.route });
  }
  
    imgServidor(id: number): string {
     
    this.servidorService.getFotoById(id).subscribe(servidor => {

       }); 
        
         return "";
  }
  
}
