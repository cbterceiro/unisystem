import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import {DataListModule, SharedModule} from 'primeng/primeng';

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

  formacoesAcademicas: FormacaoAcademica[];

  constructor(
    private formacaAcademicaService: FormacaoAcademicaService,
  ) { }

  ngOnInit() {
    this.fetchFormacoesAcademicas();
  }

  fetchFormacoesAcademicas(): void{
    this.formacaAcademicaService.getAll(1).subscribe(result => { 
      this.formacoesAcademicas = result as FormacaoAcademica[];
      for(var i = 0; i < this.formacoesAcademicas.length; i++){
      }
    });
  }
  
  deletarFormacao(id: number): void {
    console.log("deletando id: " + id);
    this.formacaAcademicaService.delete(id).subscribe(success => {
      /*this.messageService.sendSuccess({
          summary: 'Sucesso',
          detail: 'Perfil atualizado com sucesso.'
        });*/
        console.log("deletado!!");
      });
  }

  editarFormacao(): void {
    console.log("editando");
  }

  showModalFormacao(): void {
    this.exibeModalFormacao = true;
  }
}
