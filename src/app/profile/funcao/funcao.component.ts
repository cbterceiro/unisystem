import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  funcoesClass = 'funcoes';
  arrowExpand = 'chevron-down';
  labelExpand = 'Ver mais';
  hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais

  hideAddIcon = true;
  isLoading: boolean;
  finishedInitialLoading: true;
  @Output('onAfterInitialLoading') afterInitialLoadingEmitter: EventEmitter<any> = new EventEmitter<any>();

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
      if (this.funcoes.length < 3) {
        this.hideVerMais = true;
      } else {
        this.hideVerMais = false;
      }

      if (!this.finishedInitialLoading) {
        this.finishedInitialLoading = true;
        this.afterInitialLoadingEmitter.emit();
      }
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

  verMais(): void {
    if (this.funcoesClass === 'funcoesExpandido') {
      this.funcoesClass = 'funcoes';
      this.arrowExpand = 'chevron-down';
      this.labelExpand = 'Ver mais';
    } else {
      this.funcoesClass = 'funcoesExpandido';
      this.arrowExpand = 'chevron-up';
      this.labelExpand = 'Ver menos';
    }
  }
}

