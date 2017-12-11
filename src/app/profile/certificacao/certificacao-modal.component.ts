import { Component, EventEmitter, OnChanges, SimpleChanges, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem, SpinnerModule } from 'primeng/primeng';

import { AuthenticatedUserService } from '../../authentication';

import { MessageService } from '../../core';

import { Certificacao } from './certificacao.model';
import { CertificacaoService } from './certificacao.service';

import { markFormGroupDirty } from '../../shared/functions';

@Component({
  selector: 'uns-certificacao-modal',
  templateUrl: 'certificacao-modal.component.html',
  styleUrls: ['certificacao-modal.component.css']
})
export class CertificacaoModalComponent implements OnChanges {

  @Input() visible: boolean;
  @Input() certificacaoEdit: Certificacao;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();

  title: string;

  certificacaoForm: FormGroup;

  sugestoesEntidade: string[];

  idToEdit: number;
  anoAtual: number;

  isSubmitting: boolean;
  modalidade: SelectItem[];

  constructor(
    private certificacaoService: CertificacaoService,
    private formBuilder: FormBuilder,
    private authenticatedUserService: AuthenticatedUserService,
    private messageService: MessageService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.anoAtual = (new Date()).getFullYear();
    
    if (this.certificacaoEdit && this.visible) {
      this.certificacaoForm = this.formBuilder.group({
        nomeCurso: [this.certificacaoEdit.nomeCurso, Validators.required],
        entidade: [this.certificacaoEdit.entidade, Validators.required],
        anoFim: [this.certificacaoEdit.anoFim, Validators.required],
      });

      this.idToEdit = this.certificacaoEdit.id;
      this.title = 'Editar informações de certificação';
    } else {
      this.certificacaoForm = this.formBuilder.group({
        entidade: ['', Validators.required],
        nomeCurso: ['', Validators.required],
        anoFim: [2017, Validators.required],
       });

      this.idToEdit = null;
      this.title = 'Adicionar informações de certificação';
    }
  }
  

  pesquisarEntidades(event) {
    const entidade = event.query;
    this.certificacaoService.searchEntidades(entidade).subscribe(entidades => {
      this.sugestoesEntidade = entidades;
    });
  }
  
  onSubmit(isValid: boolean, certificacao: Certificacao): void {
    if (isValid) {
      const servidor = this.authenticatedUserService.getServidor();
      certificacao.id = this.idToEdit;
      certificacao.servidor_id = servidor.id;
      this.isSubmitting = true;
      this.certificacaoService.save(certificacao).subscribe(ok => {
        this.isSubmitting = false;
        this.messageService.sendSuccess({ detail: 'Certificação atualizada com sucesso.' });
        this.onSave.emit(true);
        this.closeModal();
      });
    } else {
      markFormGroupDirty(this.certificacaoForm);
    }
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
