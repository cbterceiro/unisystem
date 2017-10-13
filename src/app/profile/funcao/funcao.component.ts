import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FuncaoModalComponent } from './funcao-modal.component';

import {DataListModule, SharedModule} from 'primeng/primeng';
import {Funcao} from './funcao.model'

import {FuncaoService} from './funcao.service'

@Component({
  selector: 'uns-funcao',
  templateUrl: 'funcao.component.html',
  styleUrls: ['funcao.component.css']
})

export class FuncaoComponent implements OnInit {
  //constructor() { }

  modalfuncao: FuncaoModalComponent;
  exibeModalfuncao: boolean = false;
  objToEdit: Funcao;
  
  constructor(private cService: FuncaoService) { }
  funcoes : Funcao[];
 
 /* 
  this.CountryService.GetCountries()
    .subscribe(countries => {
        this.myGridOptions.rowData = countries as CountryData[]
    })*/

  ngOnInit() {
    
    this.atualizaForm();
    //this.funcoes = 
    
  }
  
  atualizaForm(): void
  {
    this.cService.getAllFuncoesFromId(1).subscribe(c => { 
      this.funcoes = c as Funcao[];
      console.log("funcoes:");
       console.log(this.funcoes);
    });
  }

  addNewfuncao(): void {
    console.log('modal: ' + this.exibeModalfuncao + '  interno: ');
  this.objToEdit = null;
    this.exibeModalfuncao = true;

  }
  
    editarfuncao(funcao : Funcao): void {
    console.log('editando funcao ');
    this.objToEdit = funcao;
    //this.modalfuncao.setupForm();
    //this.modalfuncao.setupForm();
    
    this.exibeModalfuncao = true;

  }
  
    deletarfuncao(id : number): void {
    console.log('deletando funcao id ' + id);
    this.cService.delete(id).subscribe(ok => { 
      console.log("Sucesso ao deletar:" + ok);
      this.atualizaForm();
    });

  }

}

