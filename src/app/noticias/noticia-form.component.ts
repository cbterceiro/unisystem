import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
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

  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();

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
      titulo: ['', Validators.required],
      conteudo: ['', Validators.required],
    });
  }

  onSubmit(isValid: boolean, noticia: Noticia): void {
    if (isValid) {
      this.noticiaService.create(noticia).subscribe(id => {
        const file = this.fileUpload.files && this.fileUpload.files[0];
        if (!file) {
          this.messageService.sendSuccess({ detail: 'Notícia criada com sucesso.' });
          this.noticiaForm.reset({ titulo: '', conteudo: '' });
          this.noticiaForm.get('conteudo').markAsPristine();
          this.onSave.emit(true);
        } else {
          this.noticiaService.updateImgDestaque(id, file).subscribe(
            img => {
              this.messageService.sendSuccess({ detail: 'Notícia criada com sucesso.' });
              this.noticiaForm.reset({ titulo: '', conteudo: '' });
              this.noticiaForm.get('conteudo').markAsPristine();
              this.onSave.emit(true);
              this.fileUpload.clear();
            },
            error => {
              console.error(error);
              this.messageService.sendWarn({ detail: 'Notícia criada sem a imagem de destaque!' });
              this.noticiaForm.reset({ titulo: '', conteudo: '' });
              this.noticiaForm.get('conteudo').markAsPristine();
              this.onSave.emit(true);
              this.fileUpload.clear();
            }
          );
        }
      });
    } else {
      markFormGroupDirty(this.noticiaForm);
    }
  }
}
