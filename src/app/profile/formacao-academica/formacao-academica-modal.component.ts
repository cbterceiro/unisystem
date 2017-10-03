import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { markFormGroupDirty } from '../../shared/functions';

import { SelectItem } from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';

import { FormacaoAcademica } from './formacao-academica.model';
import { FormacaoAcademicaService } from './formacao-academica.service';
import { InstituicaoAcademica } from './instituicao-academica.model';

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
  //nomeInstituicaoAcademica: string;           //string para pesquisar as instituicoes academicas
  instituicaoAcademica: InstituicaoAcademica;  //resultado da pesquisa de instituicoes academicas
  resultadoInstituicoesAcademicas: InstituicaoAcademica[];  //resultado da pesquisa de instituicoes academicas

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
      { label: 'Superior', value: 1 },
    ];
    this.curso = [
      { label: '  ---Escolha um curso---  ', value: null},
      { label: 'Ciência da Computação', value: 1 },
      { label: 'Sistemas de Informação', value: 2 },
    ];
  }

  pesquisarInstituicoesAcademicas(event) {
    console.log('buscando instituições' , this.instituicaoAcademica.nome); //único registro criado para teste, id = 1
    //this.resultadoInstituicoesAcademicas = ['1'];
    /*this.resultadoInstituicoesAcademicas = [
      { nome: 'Universidade Vila Velha', value: 1 }
    ];*/
    this.formacaAcademicaService.searchInstituicao(event.query).subscribe(result => {
      this.resultadoInstituicoesAcademicas = result as InstituicaoAcademica[];});
  }

  onSubmit(isValid: boolean, formacaoAcademica: FormacaoAcademica): void {
    console.log(formacaoAcademica);
    isValid = true; //passou por todas as validações
    if (isValid) {
      formacaoAcademica.instituicoes_academica_id = formacaoAcademica.instituicoes_academica_id['id'];
      this.formacaAcademicaService.save(formacaoAcademica).subscribe(ok => {
        console.log('salvando', ok);
        this.closeModal();
        /*this.messageService.sendSuccess({
          summary: 'Sucesso',
          detail: 'Perfil atualizado com sucesso.'
        });*/
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
