import { Component, EventEmitter, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { markFormGroupDirty } from '../../shared/functions';

import { SelectItem, AutoCompleteModule } from 'primeng/primeng';

import { FormacaoAcademica } from './formacao-academica.model';
import { FormacaoAcademicaService } from './formacao-academica.service';
import { InstituicaoAcademica } from './instituicao-academica.model';
import { Curso } from './curso.model';

@Component({
  selector: 'uns-formacao-academica-modal',
  templateUrl: 'formacao-academica-modal.component.html',
  styleUrls: ['formacao-academica-modal.component.css']
})
export class FormacaoAcademicaModalComponent implements OnInit {

  @Input() visible: boolean;
  @Input() formacaoEdit: FormacaoAcademica;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  formacaoForm: FormGroup;

  dateErrorMessage: boolean = true;
  today: Date = new Date();
  //mindate: Date;
  nivel: SelectItem[];
  curso: Curso;
  calendarYearRange: string;
  resultadoInstituicoesAcademicas: InstituicaoAcademica[];  //resultado da pesquisa de instituicoes academicas
  resultadoCursos: Curso[];        //resultado da pesquisa de cursos
  idToEdit: number;

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

  // subscribeToRouteParams(): void {
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formacaoEdit && this.visible) {
      this.idToEdit = this.formacaoEdit.id;
      this.formacaoForm = this.formBuilder.group({// preencher campos com os valores do objeto
        id: [this.idToEdit],
        cursoNome: [this.formacaoEdit.curso, Validators.required],
        dataInicio: [null, Validators.required],
        dataFim: [null, Validators.required],
        nivel: [this.formacaoEdit.nivel, Validators.required],
        servidor_id: [this.formacaoEdit.servidor_id, Validators.required],
        instituicao_academica_id: [null, Validators.required],
      });
    } else {
      this.setupForm();
      this.idToEdit = 0;
    }
  }

  setupForm(): void {
    //console.log('setupform', this.formacaoEdit);
    this.setupDropdownOptions();

    this.formacaoForm = this.formBuilder.group({
      id: [null],
      cursoNome: [null, Validators.required],
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
      { label: 'Fundamental', value: 'Fundamental' },
      { label: 'Médio', value: 'Médio' },
      { label: 'Superior', value: 'Superior' },
    ];
  }

  pesquisarInstituicoesAcademicas(event): void {
    this.formacaAcademicaService.searchInstituicao(event.query).subscribe(result => {
      this.resultadoInstituicoesAcademicas = result as InstituicaoAcademica[];
    });
  }

  pesquisarCursos(event): void {
    this.formacaAcademicaService.searchCurso(event.query).subscribe(result => {
      this.resultadoCursos = result as Curso[];
    });
  }

  onSubmit(isValid: boolean, formacaoAcademica: FormacaoAcademica): void {
    if (formacaoAcademica.dataInicio > formacaoAcademica.dataFim) {
      this.dateErrorMessage = isValid = false;
    } else {
      this.dateErrorMessage = isValid = true;
    }
    if (isValid) {
      if (this.idToEdit > 0)
        formacaoAcademica.id = this.idToEdit;
      else
        formacaoAcademica.id = null;
      formacaoAcademica.instituicao_academica_id = formacaoAcademica.instituicao_academica_id['id'];
      this.formacaAcademicaService.save(formacaoAcademica).subscribe(ok => {
        console.log('salvando', ok);
        this.closeModal();
        // this.messageService.sendSuccess({
        //   summary: 'Sucesso',
        //   detail: 'Perfil atualizado com sucesso.'
        // });
      });
    } else {
      markFormGroupDirty(this.formacaoForm);
    }
  }

  setYearRange(): void {
    const currentYear: number = (new Date()).getFullYear();
    this.calendarYearRange = `${currentYear - 100}:${currentYear + 10}`;
  }

  validaData(): void {
    //this.mindate = this.formacaoForm.get('dataInicio').value;
    if ((this.formacaoForm.get('dataFim').value != null) && (this.formacaoForm.get('dataInicio').value > this.formacaoForm.get('dataFim').value)) {
      this.dateErrorMessage = false;
    } else {
      this.dateErrorMessage = true;
    }
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
