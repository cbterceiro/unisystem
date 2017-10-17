import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/primeng';

import { AuthenticatedUserService } from '../../authentication';

import { Funcao } from './funcao.model';
import { FuncaoService } from './funcao.service';

@Component({
  selector: 'uns-funcao',
  templateUrl: 'funcao.component.html',
  styleUrls: ['funcao.component.css']
})
export class FuncaoComponent implements OnInit {

  exibeModalfuncao = false;
  objToEdit: Funcao;

  funcoes: Funcao[];

  hideAddIcon = true;
  isLoading: boolean;

  constructor(
    private funcaoService: FuncaoService,
    private confirmationService: ConfirmationService,
    private authenticatedUserService: AuthenticatedUserService,
  ) { }

  ngOnInit() {
    this.getFuncoes();
  }

  getFuncoes(): void {
    const servidor = this.authenticatedUserService.getServidor();
    this.isLoading = true;
    this.funcoes = [];
    this.funcaoService.getFuncoesByServidorId(servidor.id).subscribe(funcoes => {
      this.funcoes = funcoes;
      this.isLoading = false;
    });
  }

  addNewFuncao(): void {
    this.objToEdit = null;
    this.exibeModalfuncao = true;
  }

  editarFuncao(funcao: Funcao): void {
    this.objToEdit = funcao;
    this.exibeModalfuncao = true;
  }

  deletarFuncao(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este registro?',
      accept: () => {
        this.funcaoService.delete(id).subscribe(ok => {
          this.getFuncoes();
        });
      },
      reject: () => { }
    });
  }
}

