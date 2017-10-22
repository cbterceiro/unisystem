import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/primeng';

import { AuthenticatedUserService } from '../../authentication';

import { CapacitacaoService } from './capacitacao.service';
import { Capacitacao } from './capacitacao.model';

@Component({
  selector: 'uns-capacitacao',
  templateUrl: 'capacitacao.component.html',
  styleUrls: ['capacitacao.component.css']
})
export class CapacitacaoComponent implements OnInit {

  exibeModalCapacitacao = false;
  objToEdit: Capacitacao;
  capacitacoes: Capacitacao[];

  capacitacoesClass = 'capacitacoes';
  arrowExpand = 'chevron-down';
  labelExpand = 'Ver mais';
  hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais

  hideAddIcon = true;
  isLoading: boolean;
  finishedInitialLoading: true;
  @Output('onAfterInitialLoading') afterInitialLoadingEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private capacitacaoService: CapacitacaoService,
    private confirmationService: ConfirmationService,
    private authenticatedUserService: AuthenticatedUserService,
  ) { }

  ngOnInit() {
    this.getCapacitacoes();
  }

  getCapacitacoes(): void {
    const servidor = this.authenticatedUserService.getServidor();
    this.isLoading = true;
    this.capacitacoes = [];
    this.capacitacaoService.getAll(servidor.id).subscribe(capacitacoes => {
      this.capacitacoes = capacitacoes;
      this.isLoading = false;

      if (this.capacitacoes.length < 3) {
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

  addNewCapacitacao(): void {
    this.objToEdit = null;
    this.exibeModalCapacitacao = true;
  }

  editarCapacitacao(capacitacao: Capacitacao): void {
    this.objToEdit = capacitacao;
    this.exibeModalCapacitacao = true;
  }

  deletarCapacitacao(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este registro?',
      accept: () => {
        this.capacitacaoService.delete(id).subscribe(ok => {
          this.getCapacitacoes();
        });
      },
      reject: () => { }
    });
  }

  verMais(): void {
    if (this.capacitacoesClass === 'capacitacoesExpandido') {
      this.capacitacoesClass = 'capacitacoes';
      this.arrowExpand = 'chevron-down';
      this.labelExpand = 'Ver mais';
    } else {
      this.capacitacoesClass = 'capacitacoesExpandido';
      this.arrowExpand = 'chevron-up';
      this.labelExpand = 'Ver menos';
    }
  }
}
