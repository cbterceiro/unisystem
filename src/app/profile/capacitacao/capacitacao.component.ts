import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CapacitacaoModalComponent } from './capacitacao-modal.component';

import {DataTableModule, SharedModule} from 'primeng/primeng';

@Component({
  selector: 'uns-capacitacao',
  templateUrl: 'capacitacao.component.html',
  styleUrls: ['capacitacao.component.css']
})
export class CapacitacaoComponent implements OnInit {

  modalCapacitacao: CapacitacaoModalComponent;
  exibeModalCapacitacao: boolean = false;

  //constructor() { }

  ngOnInit() { }


  showModalCapacitacao(): void {
    this.exibeModalCapacitacao = true;
    console.log('modal: ' + this.exibeModalCapacitacao);
  }
}
