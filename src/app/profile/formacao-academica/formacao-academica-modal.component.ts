import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { markFormGroupDirty } from '../../shared/functions';

import { SelectItem } from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';

import { FormacaoAcademica } from './formacao-academica.model';
import { FormacaoAcademicaService } from './formacao-academica.service';

@Component({
  selector: 'uns-formacao-academica-modal',
  templateUrl: 'formacao-academica-modal.component.html',
  styleUrls: ['formacao-academica-modal.component.css']
})
export class FormacaoAcademicaModalComponent implements OnInit {

  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  formacaoForm: FormGroup;

  nivel: SelectItem[];
  curso: SelectItem[];
  instituicoesAcademicas: SelectItem[];       //
  nomeInstituicaoAcademica: string;           //string para pesquisar as instituicoes academicas
  resultadoInstituicoesAcademicas: string[];  //resultado da pesquisa de instituicoes academicas

  routeParamsSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formacaAcademicaService: FormacaoAcademicaService,
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

    this.formacaoForm = this.formBuilder.group({
      id: [null],
      curso: [null, Validators.required],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      nivel: [null, Validators.required],
      servidore_id: [1, Validators.required], //todos os testes feitos com o servidor de id 1
      instituicoes_academica_id: [null, Validators.required],
    });
  }

  setupDropdownOptions(): void {
    this.nivel = [
      { label: '  ---Nível do curso---  ', value: null },
      { label: 'teste2', value: 2 },
    ];
    this.curso = [
      { label: '  ---Escolha um curso---  ', value: null},
      { label: 'teste1', value: 1 },
    ];
  }

  pesquisarInstituicoesAcademicas(event) {
    /*this.mylookupservice.getResults(event.query).then(data => {
        this.resultadoEntidades = data;
    });*/
    console.log('buscando entidades' , this.nomeInstituicaoAcademica);
    this.resultadoInstituicoesAcademicas = ['1']; //único registro criado para teste, id = 1
    
}

  onSubmit(isValid: boolean, formacaoAcademica: FormacaoAcademica): void {
    isValid = true; //passou por todas as validações
    if (isValid) {
      this.formacaAcademicaService.save(formacaoAcademica).subscribe(ok => {
        console.log('salvando', ok);
      });
    } else{
      markFormGroupDirty(this.formacaoForm);
    }
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
