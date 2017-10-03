import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';

import { Capacitacao } from './capacitacao.model';
import { CapacitacaoService } from './capacitacao.service'

import { markFormGroupDirty } from '../../shared/functions';

@Component({
  selector: 'uns-capacitacao-modal',
  templateUrl: 'capacitacao-modal.component.html',
  styleUrls: ['capacitacao-modal.component.css']
})
export class CapacitacaoModalComponent implements OnInit {

  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  capacitacaoForm: FormGroup;

  
  entidade: Capacitacao;
  cargaHoraria: SelectItem[];
  modalidade: SelectItem[];
  entidadePesquisa: string;     //string para pesquisar as entidades
  resultadoEntidades: string[]; //resultado da pesquisa de entidades

  routeParamsSubscription: Subscription;

  constructor(
    private capacitacaoService: CapacitacaoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.setupForm();
  }

  subscribeToRouteParams(): void {
    // this.routeParamsSubscription = this.activatedRoute.params.subscribe(params => {
    //   console.log('params in CargoModalComponent', params);
    //   this.visible = params['show'] || false;
    // });
  }

  setupForm(): void {
    this.setupDropdownOptions();

    // this.cargoImageSource = '/assets/img/default-user-icon.png';

    this.capacitacaoForm = this.formBuilder.group({
      entidade: ['', Validators.required],
      modalidade: ['', Validators.required],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      cargaHoraria: [null, Validators.required],
      servidore_id: [1, Validators.required],
    });
  }

  setupDropdownOptions(): void {
    this.modalidade = [
      { label: '  ---Escolha uma modalidade---  ', value: null},
    ];
  }

  pesquisarEntidades(event) {
    /*this.mylookupservice.getResults(event.query).then(data => {
        this.resultadoEntidades = data;
    });*/
    console.log('buscando entidades');
    this.resultadoEntidades = ['UVV', 'MICROCAMP'];
}

handleDropdown(event) {
    //event.query = current value in input field
}

  onSubmit(isValid: boolean, capacitacao: Capacitacao): void {
    console.log(Capacitacao);
    isValid = true; //passou por todas as validações
    if (isValid) {
        this.capacitacaoService.save(capacitacao).subscribe(ok => {
        console.log('salvando', ok);
        this.closeModal();
        /*this.messageService.sendSuccess({
          summary: 'Sucesso',
          detail: 'Perfil atualizado com sucesso.'
        });*/
      });
    } else{
      markFormGroupDirty(this.capacitacaoForm);
    }
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    console.log('close capacitacao');
    // Navega para a rota atual apenas alterando o parâmetro de exibição
    // this.router.navigate(['./', { show: false }], { skipLocationChange: true, relativeTo: this.activatedRoute })
  }

  // pesquisarInstituicoesAcademicas(event) {
  //   console.log('buscando instituições' , this.instituicaoAcademica.nome); //único registro criado para teste, id = 1
  //   //this.resultadoInstituicoesAcademicas = ['1'];
  //   /*this.resultadoInstituicoesAcademicas = [
  //     { nome: 'Universidade Vila Velha', value: 1 }
  //   ];*/
  //   this.CapacitacaoService.searchInstituicao(event.query).subscribe(result => {
  //     this.resultadoInstituicoesAcademicas = result as InstituicaoAcademica[];});
  // }
}
