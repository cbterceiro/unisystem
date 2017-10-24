import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { HabilidadeModalComponent } from './habilidade-modal.component';

import { ConfirmationService } from 'primeng/primeng';
import { Habilidade } from './habilidade.model'

import { HabilidadeService } from './habilidade.service'

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

  habilidadesClass = 'habilidades';
  arrowExpand = 'chevron-down';
  labelExpand = 'Ver mais';
  hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais

  isLoading: boolean;
  hideAddIcon = true;

  finishedInitialLoading: true;
  @Output('onAfterInitialLoading') afterInitialLoadingEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cService: HabilidadeService,
    private confirmationService: ConfirmationService,
  ) { }

  habilidades: Habilidade[];

  /*
   this.CountryService.GetCountries()
     .subscribe(countries => {
         this.myGridOptions.rowData = countries as CountryData[]
     })*/

  ngOnInit() {

    this.atualizaForm();
    //this.funcoes =

  }

  atualizaForm(): void {
    this.isLoading = true;
    this.cService.getAllHabilidadesFromId(1).subscribe(c => {
      this.isLoading = false;
      this.habilidades = c as Habilidade[];
      if (this.habilidades.length < 3) {
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

  addNewhabilidade(): void {
    console.log('modal: ' + this.exibeModalhabilidade + '  interno: ');
    this.objToEdit = null;
    this.exibeModalhabilidade = true;

  }

  editarhabilidade(habilidade: Habilidade): void {
    console.log('editando habilidade ');
    this.objToEdit = habilidade;
    //this.modalhabilidade.setupForm();
    //this.modalhabilidade.setupForm();

    this.exibeModalhabilidade = true;

  }

  deletarhabilidade(habilidade: Habilidade): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este registro? \n',
      accept: () => {
        this.cService.delete(habilidade.id).subscribe(success => {
          console.log("Sucesso ao deletar:");
          this.atualizaForm();
        });
      },
      reject: () => { }
    });
    // console.log('deletando habilidade id ' + id);
    // this.cService.delete(id).subscribe(ok => {
    //   console.log("Sucesso ao deletar:" + ok);
    //   this.atualizaForm();
    // });
  }


  verMais(): void {
    if (this.habilidadesClass === 'habilidadesExpandido') {
      this.habilidadesClass = 'habilidades';
      this.arrowExpand = 'chevron-down';
      this.labelExpand = 'Ver mais';
    } else {
      this.habilidadesClass = 'habilidadesExpandido';
      this.arrowExpand = 'chevron-up';
      this.labelExpand = 'Ver menos';
    }
  }

}

