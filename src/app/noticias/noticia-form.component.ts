import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
        console.log('ID da notícia cadastrada:', id);
        this.messageService.sendSuccess({ detail: 'Notícia criada com sucesso.' });
        this.noticiaForm.reset();
        this.onSave.emit(true);
      });
    } else {
      markFormGroupDirty(this.noticiaForm);
    }
  }
}
