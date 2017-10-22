import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uns-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {

  finished: {
    cargo: boolean,
    funcao: boolean,
    formacaoAcademica: boolean,
    capacitacao: boolean,
    habilidade: boolean,
  };

  constructor() { }

  ngOnInit() {
    this.finished = { cargo: false, funcao: false, formacaoAcademica: false, capacitacao: false, habilidade: false };
  }

  isLoading() {
    return !this.finished.cargo
      || !this.finished.funcao
      || !this.finished.formacaoAcademica
      || !this.finished.capacitacao
      || !this.finished.habilidade;
  }
}
