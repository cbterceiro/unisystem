import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Servidor, ServidorService } from '../core';

import { delay } from '../shared/functions';

@Component({
  selector: 'uns-servidor-detalhe',
  templateUrl: 'servidor-detalhe.component.html',
  styleUrls: ['servidor-detalhe.component.css']
})
export class ServidorDetalheComponent implements OnInit {

  servidor: Servidor;
  isLoading: boolean;

  verMais: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private servidorService: ServidorService,
    private renderer: Renderer2,
    private el: ElementRef,
  ) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.isLoading = true;
    this.servidorService.getById(id).subscribe(servidor => {
      this.servidor = servidor;
      console.log('servidor', servidor);
      delay(_ => this.updateBackgroundImage(servidor.foto));
      this.isLoading = false;
    });
    this.initVerMais();
  }

  updateBackgroundImage(base64Img: string) {
    const element = this.el.nativeElement.querySelector('.servidor-foto');
    if (base64Img && element) {
      this.renderer.setStyle(element, 'background-image', `url('${base64Img}')`);
    }
  }

  initVerMais(): void {
    this.verMais = {
      cargos: false,
      funcoes: false,
      formacoes: false,
      capacitacoes: false,
      publicacoes: false,
    }
  }

  verMaisToggle(obj: any): void {

  }
}
