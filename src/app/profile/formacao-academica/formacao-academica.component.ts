import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormacaoAcademicaModalComponent } from './formacao-academica-modal.component';

import {DataTableModule, SharedModule} from 'primeng/primeng';

@Component({
  selector: 'uns-formacao-academica',
  templateUrl: 'formacao-academica.component.html',
  styleUrls: ['formacao-academica.component.css']
})
export class FormacaoAcademicaComponent implements OnInit {

  modalFormacao: FormacaoAcademicaModalComponent;
  exibeModalFormacao: boolean = false;

  //constructor() { }

  ngOnInit() { }


  showModalFormacao(): void {
    this.exibeModalFormacao = true;
    console.log('modal: ' + this.exibeModalFormacao);
  }
}
