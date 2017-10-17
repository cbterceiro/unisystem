import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ConfirmationService } from 'primeng/primeng';

import { AuthenticatedUserService } from '../../authentication';

import { MessageService } from '../../core';

import { FormacaoAcademica } from './formacao-academica.model';
import { FormacaoAcademicaService } from './formacao-academica.service';

@Component({
  selector: 'uns-formacao-academica',
  templateUrl: 'formacao-academica.component.html',
  styleUrls: ['formacao-academica.component.css']
})

export class FormacaoAcademicaComponent implements OnInit {

  exibeModalFormacao = false;
  objToEdit: FormacaoAcademica;

  formacoesAcademicas: FormacaoAcademica[];

  formacoesClass = 'formacoes';
  arrowExpand = 'chevron-down';
  labelExpand = 'Ver mais';
  hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais

  hideAddIcon = true;

  isLoading: boolean;

  constructor(
    private formacaoAcademicaService: FormacaoAcademicaService,
    private confirmationService: ConfirmationService,
    private authenticatedUserService: AuthenticatedUserService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.atualizarListaFormacoes();
  }

  atualizarListaFormacoes(): void {
    const servidor = this.authenticatedUserService.getServidor();
    this.isLoading = true;
    this.formacoesAcademicas = [];
    this.formacaoAcademicaService.getAll(servidor.id).subscribe(formacoesAcademicas => {
      this.isLoading = false;
      this.formacoesAcademicas = formacoesAcademicas;
      if (this.formacoesAcademicas.length < 3) {
        this.hideVerMais = true;
      } else {
        this.hideVerMais = false;
      }
    });
  }

  verMais(): void {
    if (this.formacoesClass === 'formacoesExpandido') {
      this.formacoesClass = 'formacoes';
      this.arrowExpand = 'chevron-down';
      this.labelExpand = 'Ver mais';
    } else {
      this.formacoesClass = 'formacoesExpandido';
      this.arrowExpand = 'chevron-up';
      this.labelExpand = 'Ver menos';
    }
  }

  adicionarFormacaoAcademica(): void {
    this.objToEdit = null;
    this.exibeModalFormacao = true;
  }

  editarFormacao(formacaoEdit: FormacaoAcademica): void {
    this.objToEdit = formacaoEdit;
    this.exibeModalFormacao = true;
  }

  deletarFormacao(formacao: FormacaoAcademica): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este registro? \n' + formacao.curso,
      accept: () => {
        this.formacaoAcademicaService.delete(formacao.id).subscribe(success => {
          this.atualizarListaFormacoes();
        });
      },
      reject: () => { }
    });
  }
}
