import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AccordionModule, SharedModule, ConfirmDialogModule, ConfirmationService, FieldsetModule } from 'primeng/primeng';

import { FormacaoAcademicaModalComponent } from './formacao-academica-modal.component';
import { FormacaoAcademica } from './formacao-academica.model';
import { FormacaoAcademicaService } from './formacao-academica.service';

@Component({
  selector: 'uns-formacao-academica',
  templateUrl: 'formacao-academica.component.html',
  styleUrls: ['formacao-academica.component.css']
})

export class FormacaoAcademicaComponent implements OnInit {

  modalFormacao: FormacaoAcademicaModalComponent;
  exibeModalFormacao: boolean = false;
  objToEdit: FormacaoAcademica;

  constructor(
    private formacaAcademicaService: FormacaoAcademicaService,
    private confirmationService: ConfirmationService,
  ) { }

  // formacoesAcademicasShow: FormacaoAcademica[];
  // formacoesAcademicasHide: FormacaoAcademica[];
  formacoesAcademicas: FormacaoAcademica[];

  formacoesClass: string = "formacoes";
  arrowExpand: string = "chevron-down";
  labelExpand: string = "Ver mais";
  hideVerMais: boolean = false;     //flag para mostrar/esconder o botão de Ver Mais

  ngOnInit() {
    this.atualizarListaFormacoes();
  }

  atualizarListaFormacoes(): void {
    // console.log("atualizando lista...");
    this.formacaAcademicaService.getAll(1).subscribe(result => {
      this.formacoesAcademicas = result as FormacaoAcademica[];
      //this.formacoesAcademicasShow = this.formacoesAcademicasHide.slice(0, 2);
      if (this.formacoesAcademicas.length < 3)
        this.hideVerMais = true;
    });
  }

  verMais(): void {
    if (this.formacoesClass == "formacoesExpandido") {
      this.formacoesClass = "formacoes";
      this.arrowExpand = "chevron-down";
      this.labelExpand = "Ver mais";
    }
    else {
      this.formacoesClass = "formacoesExpandido";
      this.arrowExpand = "chevron-up";
      this.labelExpand = "Ver menos";
    }
    // var temp: FormacaoAcademica[] = this.formacoesAcademicasShow;
    // this.formacoesAcademicasShow = this.formacoesAcademicasHide;
    // this.formacoesAcademicasHide = temp;
  }

  deletarFormacao(formacao: FormacaoAcademica): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este registro? \n' + formacao.curso,
      accept: () => {
        this.formacaAcademicaService.delete(formacao.id).subscribe(success => {
          /*this.messageService.sendSuccess({
              summary: 'Sucesso',
              detail: 'Perfil atualizado com sucesso.'
            });*/
          console.log("deletado!!");
          this.atualizarListaFormacoes();
        });
      },
      reject: () => {
        console.log("não deletar");
      }
    });
  }

  editarFormacao(formacaoEdit: FormacaoAcademica): void {
    this.objToEdit = formacaoEdit;
    this.exibeModalFormacao = true;
  }

  adicionarFormacaoAcademica(): void {
    this.objToEdit = null;
    this.exibeModalFormacao = true;
  }
}
