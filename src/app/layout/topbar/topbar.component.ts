import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uns-topbar',
  templateUrl: 'topbar.component.html',
  styleUrls: ['topbar.component.css']
})
export class TopbarComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
  
  instituicao: string;
  nomeCompleto: string;
  cargo: string;
  setor: string;
  areaInteresse: string;
  
    pesquisarServidor(): void {
    console.log('pesquisa servidor');
    console.log(this.nomeCompleto);

  }
  
      limparCampos(): void {
    console.log('limpar campos pesquisa');
    this.instituicao = '';
    this.nomeCompleto ='';
    this.cargo = '';
    this.setor = '';
    this.areaInteresse = '';
  }
  
}
