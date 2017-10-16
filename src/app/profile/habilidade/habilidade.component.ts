import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HabilidadeModalComponent } from './habilidade-modal.component';

import {DataListModule, SharedModule} from 'primeng/primeng';
import {Habilidade} from './habilidade.model'

import {HabilidadeService} from './habilidade.service'

@Component({
  selector: 'uns-habilidade',
  templateUrl: 'habilidade.component.html',
  styleUrls: ['habilidade.component.css']
})

export class HabilidadeComponent implements OnInit {
  //constructor() { }

  modalhabilidade: HabilidadeModalComponent;
  exibeModalhabilidade: boolean = false;
  objToEdit: Habilidade;
  
  constructor(private cService: HabilidadeService) { }
  habilidades : Habilidade[];
 
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
    this.cService.getAllHabilidadesFromId(1).subscribe(c => { 
      this.habilidades = c as Habilidade[];
      console.log("habilidades:");
       console.log(this.habilidades);
    });
  }

  addNewhabilidade(): void {
    console.log('modal: ' + this.exibeModalhabilidade + '  interno: ');
  this.objToEdit = null;
    this.exibeModalhabilidade = true;

  }
  
    editarhabilidade(habilidade : Habilidade): void {
    console.log('editando habilidade ');
    this.objToEdit = habilidade;
    //this.modalhabilidade.setupForm();
    //this.modalhabilidade.setupForm();
    
    this.exibeModalhabilidade = true;

  }
  
    deletarhabilidade(id : number): void {
    console.log('deletando habilidade id ' + id);
    this.cService.delete(id).subscribe(ok => { 
      console.log("Sucesso ao deletar:" + ok);
      this.atualizaForm();
    });

  }

}

