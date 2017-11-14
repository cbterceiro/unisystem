import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uns-topbar',
  templateUrl: 'topbar.component.html',
  styleUrls: ['topbar.component.css']
})
export class TopbarComponent implements OnInit {

  instituicao: string;
  nomeCompleto: string;
  cargo: string;
  funcao: string;
  habilidades: string;

  constructor() { }

  ngOnInit() {
    this.limparCampos();
  }

  pesquisarServidor(): void {
    console.log(this.nomeCompleto);
  }

  limparCampos(): void {
    this.instituicao = '';
    this.nomeCompleto = '';
    this.cargo = '';
    this.funcao = '';
    this.habilidades = '';
  }
}
