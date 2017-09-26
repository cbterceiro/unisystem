import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';

import { FormacaoAcademica } from './formacao-academica.model';

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
  entidadePesquisa: string;     //string para pesquisar as entidades
  resultadoEntidades: string[]; //resultado da pesquisa de entidades

  routeParamsSubscription: Subscription;

  constructor(
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

    this.formacaoForm = this.formBuilder.group({
      entidade: ['', Validators.required],
      curso: ['', Validators.required],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      nivel: [null, Validators.required],
    });
  }

  setupDropdownOptions(): void {
    this.nivel = [
      { label: '  ---Nível do curso---  ', value: null },
    ];
    this.curso = [
      { label: '  ---Escolha um curso---  ', value: null},
    ];
  }

  pesquisarEntidades(event) {
    /*this.mylookupservice.getResults(event.query).then(data => {
        this.resultadoEntidades = data;
    });*/
    console.log('buscando entidades');
    this.resultadoEntidades = ['entidade 1', 'entidade 2'];
}

handleDropdown(event) {
    //event.query = current value in input field
}

  onSubmit(isValid: boolean, formacao: FormacaoAcademica): void {
    console.log('isValid', isValid);
    console.log('formacao:', formacao);
    if (isValid) {

    }
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    console.log('close formacao');
    // Navega para a rota atual apenas alterando o parâmetro de exibição
    // this.router.navigate(['./', { show: false }], { skipLocationChange: true, relativeTo: this.activatedRoute })
  }
}
