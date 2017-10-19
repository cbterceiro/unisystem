import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CapacitacaoModalComponent } from './capacitacao-modal.component';

import { DataTableModule, SharedModule } from 'primeng/primeng';

import { CapacitacaoService } from './capacitacao.service';
import { Capacitacao } from './capacitacao.model'

@Component({
  selector: 'uns-capacitacao',
  templateUrl: 'capacitacao.component.html',
  styleUrls: ['capacitacao.component.css']
})
export class CapacitacaoComponent implements OnInit {

  modalCapacitacao: CapacitacaoModalComponent;
  exibeModalCapacitacao: boolean = false;

  capacitacoesClass = 'capacitacoes';
  arrowExpand = 'chevron-down';
  labelExpand = 'Ver mais';
  hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais

  capacitacaoList: Capacitacao[];

  constructor(
    private capacitacaoService: CapacitacaoService) { }

  ngOnInit() {
    this.preencherCapacitacao();
  }


  showModalCapacitacao(): void {
    this.exibeModalCapacitacao = true;
    console.log('modal: ' + this.exibeModalCapacitacao);
  }

  preencherCapacitacao(): void {
    this.capacitacaoService.getAll(1).subscribe(result => {
      this.capacitacaoList = result as Capacitacao[];
      console.log("capacitacoes: ", this.capacitacaoList)
      if (this.capacitacaoList.length < 3) {
        this.hideVerMais = true;
      } else {
        this.hideVerMais = false;
      }
    }
    );
  }

  deletarCapacitacao(id: number): void {
    console.log("Deletando id: " + id);
    this.capacitacaoService.delete(id).subscribe(success => {
      /*this.messageService.sendSuccess({
          summary: 'Sucesso',
          detail: 'Perfil atualizado com sucesso.'
        });*/
      console.log("Deletado!!");
    });
  }

  verMais(): void {
    if (this.capacitacoesClass === 'capacitacoesExpandido') {
      this.capacitacoesClass = 'capacitacoes';
      this.arrowExpand = 'chevron-down';
      this.labelExpand = 'Ver mais';
    } else {
      this.capacitacoesClass = 'capacitacoesExpandido';
      this.arrowExpand = 'chevron-up';
      this.labelExpand = 'Ver menos';
    }
  }
}
