import { Component, EventEmitter, OnInit, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { markFormGroupDirty } from '../../shared/functions';

import { AuthenticatedUserService } from '../../authentication';

import { MessageService } from '../../core';

import { FormacaoAcademicaService } from './formacao-academica.service';

import { FormacaoAcademica } from './formacao-academica.model';
import { InstituicaoAcademica } from './instituicao-academica.model';
import { Curso } from './curso.model';

@Component({
  selector: 'uns-formacao-academica-modal',
  templateUrl: 'formacao-academica-modal.component.html',
  styleUrls: ['formacao-academica-modal.component.css']
})
export class FormacaoAcademicaModalComponent implements OnInit, OnChanges {

  @Input() visible: boolean;
  @Input() formacaoEdit: FormacaoAcademica;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();


  formacaoForm: FormGroup;

  dateErrorMessage = true;
  nivel: SelectItem[];
  calendarYearRange: string;

  resultadoInstituicoesAcademicas: InstituicaoAcademica[]; // resultado da pesquisa de instituicoes academicas
  resultadoCursos: Curso[]; // resultado da pesquisa de cursos

  idToEdit: number;

  title: string;

  isSubmitting: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private formacaoAcademicaService: FormacaoAcademicaService,
    private authenticatedUserService: AuthenticatedUserService,
    private messageService: MessageService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formacaoEdit && this.visible) {
      this.idToEdit = this.formacaoEdit.id;
      this.title = 'Editar formação acadêmica';
      this.formacaoForm = this.formBuilder.group({// preencher campos com os valores do objeto
        id: [this.idToEdit],
        curso: [this.formacaoEdit.curso, Validators.required],
        dataInicio: [this.formacaoEdit.dataInicio, Validators.required],
        dataFim: [this.formacaoEdit.dataFim, Validators.required],
        nivel: [this.formacaoEdit.nivel, Validators.required],
        instituicao_academica_id: [this.formacaoEdit['instituicaoAcademica'], Validators.required],
      });
    } else {
      this.setupForm();
      this.idToEdit = null;
      this.title = 'Adicionar formação acadêmica';
    }
  }

  ngOnInit() {
    this.setYearRange();
  }

  setupForm(): void {
    this.setupDropdownOptions();

    this.formacaoForm = this.formBuilder.group({
      id: [null],
      curso: [null, Validators.required],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      nivel: [null, Validators.required],
      instituicao_academica_id: [null, Validators.required],
    });
  }

  setupDropdownOptions(): void {
    this.nivel = [
      { label: 'Nível do curso', value: null },
      { label: 'Fundamental', value: 'Fundamental' },
      { label: 'Médio', value: 'Médio' },
      { label: 'Superior', value: 'Superior' },
    ];
  }

  pesquisarInstituicoesAcademicas(event): void {
    this.formacaoAcademicaService.searchInstituicao(event.query).subscribe(instituicoesAcademicas => {
      this.resultadoInstituicoesAcademicas = instituicoesAcademicas;
    });
  }

  pesquisarCursos(event): void {
    this.formacaoAcademicaService.searchCurso(event.query).subscribe(cursos => {
      this.resultadoCursos = cursos;
    });
  }

  onSubmit(isValid: boolean, formacaoAcademica: FormacaoAcademica): void {
    if (isValid) {
      const servidor = this.authenticatedUserService.getServidor();
      formacaoAcademica.id = this.idToEdit;
      formacaoAcademica.instituicao_academica_id = formacaoAcademica.instituicao_academica_id['id'];
      formacaoAcademica.servidor_id = servidor.id;
      this.isSubmitting = true;
      this.formacaoAcademicaService.save(formacaoAcademica).subscribe(ok => {
        this.isSubmitting = false;
        this.messageService.sendSuccess({ detail: 'Formação acadêmica atualizada com sucesso.' });
        this.onSave.emit(true);
        this.closeModal();
      });
    } else {
      markFormGroupDirty(this.formacaoForm);
    }
  }

  setYearRange(): void {
    const currentYear: number = (new Date()).getFullYear();
    this.calendarYearRange = `${currentYear - 100}:${currentYear + 10}`;
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
