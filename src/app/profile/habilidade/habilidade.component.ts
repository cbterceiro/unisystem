import { Component, OnInit, ElementRef,  Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/primeng';
import { AuthenticatedUserService } from '../../authentication';
import { MessageService } from '../../core';
import {ViewEncapsulation} from '@angular/core';

import { Habilidade } from './habilidade.model'
import { HabilidadeService } from './habilidade.service'

@Component({
  selector: 'uns-habilidade',
  templateUrl: 'habilidade.component.html',
  styleUrls: ['habilidade.component.css'],
})

export class HabilidadeComponent implements OnInit {
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
  
  exibeModalRecomendacao = false;
  habilidade: any;

  constructor(private cService: HabilidadeService,
    private confirmationService: ConfirmationService,
    private authenticatedUserService: AuthenticatedUserService,
    private messageService: MessageService,
     private el: ElementRef
  ) { }

  habilidades: Habilidade[];

  ngOnInit() {

    this.atualizaForm();

  }

onClickDetalheRecomendacao(habilidade) :void{
    if(habilidade.numRecomendacoes > 0){
        this.exibeModalRecomendacao = true;
        this.habilidade = habilidade;
    }
  }

  atualizaForm(): void {
    var self = this;
    const servidor = this.authenticatedUserService.getServidor();
    this.isLoading = true;
    this.cService.getAllHabilidadesFromId(servidor.id).subscribe(c => {
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
    this.exibeModalhabilidade = true;

  }
  
  addHabilidade(value): void{
    var self = this;
   
    setTimeout( function(){
       var elements = self.el.nativeElement.querySelectorAll('.ui-chips-token');
     var element = elements[elements.length - 1];
      element.firstElementChild.click()
      const servidor = self.authenticatedUserService.getServidor();
            self.cService.savehabilidade({id: 0, nome: value, numRecomendacoes: 0, servidor_id:  servidor.id, recomendado: false}).subscribe(ok => {
            self.messageService.sendSuccess({ detail: 'Habilidade incluída com sucesso.' });
            self.atualizaForm();
        })
    }, 0);
    
     
  }
  
  removeHabilidade(element, habilidade: Habilidade){
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover esta habilidade? As recomendações serão perdidas. \n',
      accept: () => {
        this.cService.delete(habilidade.id).subscribe(success => {
          this.messageService.sendSuccess({ detail: 'Habilidade removida com sucesso.' });
          element.parentElement.querySelector('span.ui-chips-token-icon.fa.fa-fw.fa-close').click();
        });
      },
      reject: () => { }
    });
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

