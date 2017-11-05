import { Component, EventEmitter, OnChanges, SimpleChanges, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { AuthenticatedUserService } from '../../authentication';

import { MessageService } from '../../core';

import { Capacitacao } from './capacitacao.model';
import { CapacitacaoService } from './capacitacao.service';

import { markFormGroupDirty } from '../../shared/functions';

@Component({
  selector: 'uns-capacitacao-modal',
  templateUrl: 'capacitacao-modal.component.html',
  styleUrls: ['capacitacao-modal.component.css']
})
export class CapacitacaoModalComponent implements OnChanges {

  @Input() visible: boolean;
  @Input() capacitacaoEdit: Capacitacao;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();

  title: string;

  capacitacaoForm: FormGroup;

  sugestoesEntidade: string[];

  idToEdit: number;

  isSubmitting: boolean;

  constructor(
    private capacitacaoService: CapacitacaoService,
    private formBuilder: FormBuilder,
    private authenticatedUserService: AuthenticatedUserService,
    private messageService: MessageService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.capacitacaoEdit && this.visible) {
      this.capacitacaoForm = this.formBuilder.group({
        nome: [this.capacitacaoEdit.nome, Validators.required],
        entidade: [this.capacitacaoEdit.entidade, Validators.required],
        modalidade: [this.capacitacaoEdit.modalidade, Validators.required],
        dataInicio: [this.capacitacaoEdit.dataInicio, Validators.required],
        dataFim: [this.capacitacaoEdit.dataFim, Validators.required],
        cargaHoraria: [this.capacitacaoEdit.cargaHoraria, Validators.required],
      });

      this.idToEdit = this.capacitacaoEdit.id;
      this.title = 'Editar informações de capacitação';
    } else {
      this.capacitacaoForm = this.formBuilder.group({
        entidade: ['', Validators.required],
        nome: ['', Validators.required],
        modalidade: ['', Validators.required],
        dataInicio: [null, Validators.required],
        dataFim: [null, Validators.required],
        cargaHoraria: [null, Validators.required],
      });

      this.idToEdit = null;
      this.title = 'Adicionar informações de capacitação';
    }
  }

  pesquisarEntidades(event) {
    const entidade = event.query;
    this.capacitacaoService.searchEntidades(entidade).subscribe(entidades => {
      this.sugestoesEntidade = entidades;
    });
  }

  onSubmit(isValid: boolean, capacitacao: Capacitacao): void {
    if (isValid) {
      const servidor = this.authenticatedUserService.getServidor();
      capacitacao.id = this.idToEdit;
      capacitacao.servidor_id = servidor.id;
      this.isSubmitting = true;
      this.capacitacaoService.save(capacitacao).subscribe(ok => {
        this.isSubmitting = false;
        this.messageService.sendSuccess({ detail: 'Capacitação atualizada com sucesso.' });
        this.onSave.emit(true);
        this.closeModal();
      });
    } else {
      markFormGroupDirty(this.capacitacaoForm);
    }
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
