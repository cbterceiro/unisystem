import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/primeng';
import { AuthenticatedUserService } from '../../authentication';

import { MessageService } from '../../core';

import { Publicacao } from './publicacao.model';
import { PublicacaoService } from './publicacao.service';

@Component({
  selector: 'uns-publicacao',
  templateUrl: 'publicacao.component.html',
  styleUrls: ['publicacao.component.css']
})

export class PublicacaoComponent implements OnInit {

  exibeModalPublicacao = false;
  objToEdit: Publicacao;

  publicacoes: Publicacao[];

  publicacoesClass = 'publicacoes';
  arrowExpand = 'chevron-down';
  labelExpand = 'Ver mais';
  hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais

  hideAddIcon = true;

  isLoading: boolean;

  finishedInitialLoading: true;
  @Output('onAfterInitialLoading') afterInitialLoadingEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private publicacaoService: PublicacaoService,
    private confirmationService: ConfirmationService,
    private authenticatedUserService: AuthenticatedUserService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.atualizarListaPublicacoes();
    const today = new Date().getFullYear().toString();
    // this.publicacoes = [
    //   {
    //     id: 0,
    //     titulo: "Livro Angular",
    //     ano: today,
    //     local: "Vila Velha",
    //     tipo: "Produção bibliográfica",
    //     servidor_id: 1
    //   },
    //   {
    //     id: 1,
    //     titulo: "Livro Node",
    //     ano: today,
    //     local: "Vila Velha",
    //     tipo: "Produção bibliográfica",
    //     servidor_id: 1
    //   },
    //   {
    //     id: 2,
    //     titulo: "Livro Javascript",
    //     ano: today,
    //     local: "Vix",
    //     tipo: "Produção bibliográfica",
    //     servidor_id: 1
    //   },
    // ];
    if (this.publicacoes.length < 3) {
      this.hideVerMais = true;
    } else {
      this.hideVerMais = false;
    }
  }

  atualizarListaPublicacoes(): void {
    const servidor = this.authenticatedUserService.getServidor();
    this.isLoading = true;
    this.publicacoes = [];
    this.publicacaoService.getAll(servidor.id).subscribe(publicacoes => {
      this.isLoading = false;
      this.publicacoes = publicacoes;
      if (this.publicacoes.length < 3) {
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

  verMais(): void {
    if (this.publicacoesClass === 'publicacoesExpandido') {
      this.publicacoesClass = 'publicacoes';
      this.arrowExpand = 'chevron-down';
      this.labelExpand = 'Ver mais';
    } else {
      this.publicacoesClass = 'publicacoesExpandido';
      this.arrowExpand = 'chevron-up';
      this.labelExpand = 'Ver menos';
    }
  }

  adicionarPublicacao(): void {
    this.objToEdit = null;
    this.exibeModalPublicacao = true;
  }

  editarPublicacao(publicacaoEdit: Publicacao): void {
    this.objToEdit = publicacaoEdit;
    this.exibeModalPublicacao = true;
  }

  deletarPublicacao(publicacao: Publicacao): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este registro? \n',
      accept: () => {
        this.publicacaoService.delete(publicacao.id).subscribe(success => {
          this.atualizarListaPublicacoes();
        });
      },
      reject: () => { }
    });
  }
}
