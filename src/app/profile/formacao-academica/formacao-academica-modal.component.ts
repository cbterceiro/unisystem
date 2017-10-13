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

  dateErrorMessage: boolean = true;
  today: Date = new Date();
  mindate: Date;
  nivel: SelectItem[];
  curso: SelectItem[];
  calendarYearRange: string;
  instituicaoAcademica: InstituicaoAcademica;  //pesquisa de instituicoes academicas
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
    this.setYearRange();
  }

  subscribeToRouteParams(): void {
  }

  setupForm(): void {
    this.setupDropdownOptions();

    this.formacaoForm = this.formBuilder.group({
      id: [null],
      curso: [null, Validators.required],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      nivel: [null, Validators.required],
      servidor_id: [1, Validators.required], //todos os testes feitos com o servidor de id 1
      instituicao_academica_id: [null, Validators.required],
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
    this.formacaAcademicaService.searchInstituicao(event.query).subscribe(result => {
      this.resultadoInstituicoesAcademicas = result as InstituicaoAcademica[];});
  }

  onSubmit(isValid: boolean, formacaoAcademica: FormacaoAcademica): void {    
    if (formacaoAcademica.dataInicio > formacaoAcademica.dataFim){
      this.dateErrorMessage = isValid = false;
    } else {
      this.dateErrorMessage = isValid = true;
    }    
    if (isValid) {
      formacaoAcademica.instituicao_academica_id = formacaoAcademica.instituicao_academica_id['id'];
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

  setYearRange(): void {
    const currentYear: number = (new Date()).getFullYear();
    this.calendarYearRange = `${currentYear - 100}:${currentYear}`;
  }

  validaData(): void{
    //this.mindate = this.formacaoForm.get('dataInicio').value;
    if (this.formacaoForm.get('dataInicio').value > this.formacaoForm.get('dataFim').value){
      this.dateErrorMessage = false;
    } else{
      this.dateErrorMessage = true;
    }
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
