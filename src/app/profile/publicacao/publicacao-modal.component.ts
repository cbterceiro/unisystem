import { Component, EventEmitter, OnInit, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { markFormGroupDirty } from '../../shared/functions';

import { AuthenticatedUserService } from '../../authentication';
import { MessageService } from '../../core';

import { PublicacaoService } from './publicacao.service';

import { Publicacao } from './publicacao.model';

@Component({
  selector: 'uns-publicacao-modal',
  templateUrl: 'publicacao-modal.component.html',
  styleUrls: ['publicacao-modal.component.css']
})
export class PublicacaoModalComponent implements OnInit, OnChanges {

  @Input() visible: boolean;
  @Input() publicacaoEdit: Publicacao;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();


  publicacaoForm: FormGroup;

  tipo: SelectItem[];
  ano: SelectItem[];
  today: Date = new Date();

  idToEdit: number;

  title: string;

  isSubmitting: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private publicacaoService: PublicacaoService,
    private authenticatedUserService: AuthenticatedUserService,
    private messageService: MessageService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.publicacaoEdit && this.visible) {
      this.idToEdit = this.publicacaoEdit.id;
      this.title = 'Editar publicacao';
      this.publicacaoForm = this.formBuilder.group({// preencher campos com os valores do objeto
        id: [this.idToEdit],
        titulo: [this.publicacaoEdit.titulo, Validators.required],
        ano: [this.publicacaoEdit.ano, Validators.required],
        local: [this.publicacaoEdit.local, Validators.required],
        tipo: [this.publicacaoEdit.tipo, Validators.required],

      });
    } else {
      this.setupForm();
      this.idToEdit = null;
      this.title = 'Adicionar publicacao';
    }
  }

  ngOnInit() {
  }

  setupForm(): void {
    this.setupDropdownOptions();

    this.publicacaoForm = this.formBuilder.group({
      id: [null],
      titulo: [null, Validators.required],
      local: [null, Validators.required],
      ano: [null, Validators.required],
      tipo: [null, Validators.required],
    });
  }

  setupDropdownOptions(): void {//(produção bibliográfica, produção técnica, produção artística/cultural, outros)
    this.tipo = [
      { label: 'Selecione o tipo de publicação', value: null },
      { label: 'Produção Bibliográfica', value: 'Produção Bibliográfica' },
      { label: 'Produção Técnica', value: 'Produção Técnica' },
      { label: 'Produção Artística/Cultural', value: 'Produção Artística/Cultural' },
      { label: 'Outro', value: 'Outro' },
    ];
    // console.log("array ", this.tipo[2]);
    this.ano = [{ label: "Selecione o ano", value: null }];
    var year = new Date();
    const ano_atual = year.getFullYear();

    for (var i = 0; i <= 100; i++) {
      this.ano[i + 1] = { label: (ano_atual - i).toString(), value: (ano_atual - i) };
    }
  }

  onSubmit(isValid: boolean, publicacao: Publicacao): void {
    if (isValid) {
      const servidor = this.authenticatedUserService.getServidor();
      publicacao.id = this.idToEdit;
      publicacao.servidor_id = servidor.id;
      this.isSubmitting = true;
      this.publicacaoService.save(publicacao).subscribe(ok => {
        this.isSubmitting = false;
        this.messageService.sendSuccess({ detail: 'Publicacao atualizada com sucesso.' });
        this.onSave.emit(true);
        this.closeModal();
      });
    } else {
      markFormGroupDirty(this.publicacaoForm);
    }
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
