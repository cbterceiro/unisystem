import { Component, EventEmitter, OnChanges, SimpleChanges, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem, SpinnerModule } from 'primeng/primeng';

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
  anoAtual: number;

  isSubmitting: boolean;
  modalidade: SelectItem[];

  constructor(
    private capacitacaoService: CapacitacaoService,
    private formBuilder: FormBuilder,
    private authenticatedUserService: AuthenticatedUserService,
    private messageService: MessageService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.anoAtual = (new Date()).getFullYear();
    
    if (this.capacitacaoEdit && this.visible) {
      this.capacitacaoForm = this.formBuilder.group({
        nomeCurso: [this.capacitacaoEdit.nomeCurso, Validators.required],
        entidade: [this.capacitacaoEdit.entidade, Validators.required],
        modalidade: [this.capacitacaoEdit.modalidade, Validators.required],
        anoFim: [this.capacitacaoEdit.anoFim, Validators.required],
      //  dataInicio: [this.capacitacaoEdit.dataInicio, Validators.required],
       // dataFim: [this.capacitacaoEdit.dataFim, Validators.required],
        cargaHoraria: [this.capacitacaoEdit.cargaHoraria, Validators.required],
      });

      this.idToEdit = this.capacitacaoEdit.id;
      this.title = 'Editar informações de capacitação';
    } else {
      this.capacitacaoForm = this.formBuilder.group({
        entidade: ['', Validators.required],
        nomeCurso: ['', Validators.required],
        modalidade: ['Presencial', Validators.required],
        anoFim: [2017, Validators.required],
       // dataInicio: [null, Validators.required],
       // dataFim: [null, Validators.required],
        cargaHoraria: [null, Validators.required],
      });

      this.idToEdit = null;
      this.title = 'Adicionar informações de capacitação';
      
      if(this.modalidade == null)
      {
        this.setupDropdownModalidade();
      }
    }
  }
  

  pesquisarEntidades(event) {
    const entidade = event.query;
    this.capacitacaoService.searchEntidadesAutoComplete(entidade).subscribe(entidades => {
      console.log(entidades);
      this.sugestoesEntidade = entidades;
    });
  }
  
  setupDropdownModalidade(): void {
    this.modalidade = [
      { label: 'Modalidade', value: null },
      { label: 'Presencial', value: 'Presencial' },
      { label: 'Semi-Presencial', value: 'Semi-Presencial' },
      { label: 'EAD', value: 'EAD' },
    ];
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
