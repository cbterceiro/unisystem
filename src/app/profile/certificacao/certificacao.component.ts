import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/primeng';

import { AuthenticatedUserService } from '../../authentication';

import { CertificacaoService } from './certificacao.service';
import { Certificacao } from './certificacao.model';

@Component({
  selector: 'uns-certificacao',
  templateUrl: 'certificacao.component.html',
  styleUrls: ['certificacao.component.css']
})
export class CertificacaoComponent implements OnInit {

  exibeModalCertificacao = false;
  objToEdit: Certificacao;
  certificacoes: Certificacao[];

  certificacoesClass = 'certificacoes';
  arrowExpand = 'chevron-down';
  labelExpand = 'Ver mais';
  hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais

  hideAddIcon = true;
  isLoading: boolean;
  finishedInitialLoading: true;
  @Output('onAfterInitialLoading') afterInitialLoadingEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private certificacaoService: CertificacaoService,
    private confirmationService: ConfirmationService,
    private authenticatedUserService: AuthenticatedUserService,
  ) { }

  ngOnInit() {
    this.getCertificacoes();
  }

  getCertificacoes(): void {
    const servidor = this.authenticatedUserService.getServidor();
    this.isLoading = true;
    this.certificacoes = [];
    this.certificacaoService.getAll(servidor.id).subscribe(certificacoes => {
      this.certificacoes = certificacoes;
      this.isLoading = false;

      if (this.certificacoes.length < 3) {
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

  addNewCertificacao(): void {
    this.objToEdit = null;
    this.exibeModalCertificacao = true;
  }

  editarCertificacao(certificacao: Certificacao): void {
    this.objToEdit = certificacao;
    this.exibeModalCertificacao = true;
  }

  deletarCertificacao(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este registro?',
      accept: () => {
        this.certificacaoService.delete(id).subscribe(ok => {
          this.getCertificacoes();
        });
      },
      reject: () => { }
    });
  }

  verMais(): void {
    if (this.certificacoesClass === 'certificacoesExpandido') {
      this.certificacoesClass = 'certificacoes';
      this.arrowExpand = 'chevron-down';
      this.labelExpand = 'Ver mais';
    } else {
      this.certificacoesClass = 'certificacoesExpandido';
      this.arrowExpand = 'chevron-up';
      this.labelExpand = 'Ver menos';
    }
  }
}
