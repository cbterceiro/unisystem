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
  orgao: string;
  setor: string;

  habilidade: string;
  funcao: string;
  
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
    this.orgao = '';
    this.setor = '';
    this.habilidade = '';
    this.funcao = '';
  }
}
