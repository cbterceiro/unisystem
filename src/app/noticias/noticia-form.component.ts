import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FileUpload } from 'primeng/primeng';

import { MessageService, NoticiaService, Noticia } from '../core';

import { markFormGroupDirty } from '../shared/functions';

@Component({
  selector: 'uns-noticia-form',
  templateUrl: 'noticia-form.component.html',
  styleUrls: ['noticia-form.component.css'],
})
export class NoticiaFormComponent implements OnInit {

  noticiaForm: FormGroup;
  isSubmitting: boolean;

  maxFileSize: number = 1 * 1024 * 1024; // 1 MB
  @ViewChild('fileUpload') fileUpload: FileUpload;

  @Input() idServidor: number;

  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();

  isEditing: boolean;

  constructor(
    private noticiaService: NoticiaService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.setupForm();
  }

  setupForm(): void {
    this.noticiaForm = this.formBuilder.group({
      id: [null],
      titulo: ['', Validators.required],
      conteudo: ['', Validators.required],
    });
  }

  startEdit(noticia: Noticia) {
    this.isEditing = true;
    this.noticiaForm.patchValue(noticia);
  }

  cancelEditing() {
    this.noticiaForm.reset({ titulo: '', conteudo: '' });
    this.noticiaForm.get('conteudo').markAsPristine();
    this.fileUpload.clear();
    this.isEditing = false;
  }

  onSubmit(isValid: boolean, noticia: Noticia): void {
    if (isValid) {
      if (this.isEditing) {
        this.update(noticia);
      } else {
        this.create(noticia);
      }
    } else {
      markFormGroupDirty(this.noticiaForm);
    }
  }

  create(noticia: Noticia) {
    this.isSubmitting = true;
    this.noticiaService.create(noticia, this.idServidor).subscribe(id => {
      const file = this.fileUpload.files && this.fileUpload.files[0];
      if (!file) {
        this.messageService.sendSuccess({ detail: 'Notícia criada com sucesso.' });
        this.noticiaForm.reset({ titulo: '', conteudo: '' });
        this.noticiaForm.get('conteudo').markAsPristine();
        this.onSave.emit(true);
        this.isSubmitting = false;
      } else {
        this.noticiaService.updateImgDestaque(id, file).subscribe(
          img => {
            this.messageService.sendSuccess({ detail: 'Notícia criada com sucesso.' });
            this.noticiaForm.reset({ titulo: '', conteudo: '' });
            this.noticiaForm.get('conteudo').markAsPristine();
            this.onSave.emit(true);
            this.fileUpload.clear();
            this.isSubmitting = false;
          },
          error => {
            console.error(error);
            this.messageService.sendWarn({ detail: 'Notícia criada sem a imagem de destaque!' });
            this.noticiaForm.reset({ titulo: '', conteudo: '' });
            this.noticiaForm.get('conteudo').markAsPristine();
            this.onSave.emit(true);
            this.fileUpload.clear();
            this.isSubmitting = false;
          }
        );
      }
    });
  }

  update(noticia: Noticia) {
    this.isSubmitting = true;
    this.noticiaService.update(noticia, this.idServidor).subscribe(success => {
      const file = this.fileUpload.files && this.fileUpload.files[0];
      if (!file) {
        this.messageService.sendSuccess({ detail: 'Notícia atualizada com sucesso.' });
        this.noticiaForm.reset({ titulo: '', conteudo: '' });
        this.noticiaForm.get('conteudo').markAsPristine();
        this.onSave.emit(true);
        this.isSubmitting = false;
        this.isEditing = false;
      } else {
        this.noticiaService.updateImgDestaque(noticia.id, file).subscribe(
          img => {
            this.messageService.sendSuccess({ detail: 'Notícia criada com sucesso.' });
            this.noticiaForm.reset({ titulo: '', conteudo: '' });
            this.noticiaForm.get('conteudo').markAsPristine();
            this.onSave.emit(true);
            this.fileUpload.clear();
            this.isSubmitting = false;
            this.isEditing = false;
          },
          error => {
            console.error(error);
            this.messageService.sendWarn({ detail: 'Notícia criada sem a imagem de destaque!' });
            this.noticiaForm.reset({ titulo: '', conteudo: '' });
            this.noticiaForm.get('conteudo').markAsPristine();
            this.onSave.emit(true);
            this.fileUpload.clear();
            this.isSubmitting = false;
            this.isEditing = false;
          }
        );
      }
    });
  }
}
