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
    this.formacaAcademicaService.getAll(1).subscribe(result => { 
      this.formacoesAcademicas = result as FormacaoAcademica[];
      for(var i = 0; i < this.formacoesAcademicas.length; i++){
        console.log(i + ': ' + this.formacoesAcademicas[i].dataFim);  
      }
    });
  }  

  showModalFormacao(): void {
    this.exibeModalFormacao = true;
  }
}
