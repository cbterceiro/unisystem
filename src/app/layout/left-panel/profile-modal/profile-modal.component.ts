import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem, FileUpload, DomHandler } from 'primeng/primeng';

import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';

import { markFormGroupDirty, delay } from '../../../shared/functions';

import { SessionService, SessionKeys, MessageService } from '../../../core';

import { ServidorService, Servidor } from '../../../core/';

import { AuthenticatedUserService } from '../../../authentication/';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'uns-profile-modal',
  templateUrl: 'profile-modal.component.html',
  styleUrls: ['profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit, AfterViewInit, OnDestroy {

  isSubmitting: boolean;
  isUpdatingPicture: boolean;

  maxFileSize: number = 1 * 1024 * 1024; // 1 MB

  profileForm: FormGroup;

  maritalStatuses: SelectItem[];
  nationalities: SelectItem[];
  states: SelectItem[];
  calendarYearRange: string;
  today: Date = new Date();

  dialogElement: HTMLElement;
  dialogElementHeight: number;

  @ViewChild('fileUpload') fileUpload: FileUpload;

  imageListenerSubscription: Subscription;

  // Two-way data binding de visible
  _visible: boolean;
  @Input() get visible(): boolean { return this._visible; }
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  set visible(visible: boolean) {
    this._visible = visible;
    this.visibleChange.emit(visible);
  }

  imageData: any;
  visibleCropModal: boolean;
  imgFileName: string;
  cropperSettings: CropperSettings;
  @ViewChild('cropper') cropper: ImageCropperComponent;

  constructor(
    private formBuilder: FormBuilder,
    private servidorService: ServidorService,
    private sessionService: SessionService,
    private messageService: MessageService,
    private domHandler: DomHandler,
    private el: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private authenticatedUserService: AuthenticatedUserService,
  ) { }

  ngOnInit() {
    this.setupForm();
    this.setYearRange();
    this.loadServidor();
    this.setupImageListener();

    this.setupImageCropper();
  }

  setupImageCropper() {
    this.imageData = {};
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.canvasWidth = 600;
    this.cropperSettings.canvasHeight = 400;
    this.cropperSettings.minWidth = 100;
    this.cropperSettings.minWidth = 100;
    this.cropperSettings.width = 300;
    this.cropperSettings.height = 300;
  }

  ngAfterViewInit() {
    const servidor: Servidor = this.authenticatedUserService.getServidor();
    this.updateBackgroundImage(servidor.foto);
  }

  setupForm(): void {
    this.setupDropdownOptions();
    this.profileForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      sexo: [null, Validators.required],
      estadoCivil: [null, Validators.required],
      numeroFuncional: [null, Validators.required],
      nacionalidade: ['br', Validators.required],
      estado: ['ES', Validators.required],
      cidade: [null, Validators.required],
      foto: [null],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      telefone: [null],
    });
  }

  setupDropdownOptions(): void {
    this.maritalStatuses = [
      { label: 'Selecione um estado civil', value: null },
      { label: 'Solteiro (a)', value: 'Solteiro' },
      { label: 'Casado (a)', value: 'Casado' },
      { label: 'Divorciado (a)', value: 'Divorciado' },
      { label: 'Viúvo (a)', value: 'Viúvo' },
      { label: 'Separado (a)', value: 'Separado' },
    ];
    this.nationalities = [
      { label: 'Selecione uma nacionalidade', value: null },
      { label: 'Brasileiro', value: 'br' },
    ];
    this.states = [
      { label: 'Selecione', value: null },
      { label: 'ES', value: 'ES' },
    ];
  }

  setupImageListener(): void {
    this.imageListenerSubscription = this.authenticatedUserService.listen().subscribe(servidor => {
      this.updateBackgroundImage(servidor.foto);
    });
  }

  loadServidor(): void {
    const servidor: Servidor = this.authenticatedUserService.getServidor();
    this.profileForm.patchValue(servidor);

    // Hack para consertar o bug do PrimeNG de exibição de data no formato inválido na primeira vez em que o componente
    // Calendar é exibido na tela
    delay(_ => this.profileForm.get('dataNascimento').setValue(servidor.dataNascimento));
  }

  onSubmit(isValid: boolean, servidor: Servidor): void {
    if (isValid) {
      this.isSubmitting = true;
      this.servidorService.save(servidor).subscribe(success => {
        this.isSubmitting = false;
        this.closeModal();
        this.messageService.sendSuccess({
          summary: 'Sucesso',
          detail: 'Perfil atualizado com sucesso.'
        });
        this.authenticatedUserService.updateServidor(servidor);
      });
    } else {
      markFormGroupDirty(this.profileForm);
    }
  }

  closeModal(): void {
    this.visible = false;
  }

  setYearRange(): void {
    const currentYear: number = (new Date()).getFullYear();
    this.calendarYearRange = `${currentYear - 100}:${currentYear}`;
  }

  getContentStyle(): { [cssProperty: string]: string } {
    this.dialogElement = this.dialogElement || this.domHandler.findSingle(this.el.nativeElement, '.ui-dialog');
    if (this.dialogElement) {
      this.dialogElementHeight = this.dialogElementHeight || this.domHandler.getHiddenElementOuterHeight(this.dialogElement);
      const fullHeight: number = this.domHandler.getViewport().height;
      if (fullHeight <= this.dialogElementHeight) {
        return { 'overflow-y': 'scroll' };
      }
    }
    return { overflow: 'visible', height: 'auto' };
  }

  updateBackgroundImage(base64Img: string) {
    this.profileForm.get('foto').setValue(base64Img);
  }

  fileChangeListener(event) {
    const file = event.target.files[0];
    if (file.size > this.maxFileSize) {
      this.messageService.sendError({ detail: `O tamanho máximo para a imagem é de ${this.maxFileSize / 1024 / 1024} MB.` });
      return;
    }
    const image = new Image();
    const reader = new FileReader();
    reader.onloadend = (loadEvent) => {
      image.src = loadEvent.target['result'];
      this.cropper.setImage(image);
    };
    reader.readAsDataURL(file);
    this.imgFileName = file.name;
  }

  upload(imageData) {
    const id = this.profileForm.get('id').value;
    this.isUpdatingPicture = true;
    if (imageData.image && id) {
      this.servidorService.updateImg(id, imageData.image).subscribe(
        img => {
          this.isUpdatingPicture = false;
          this.messageService.sendSuccess({ detail: 'Foto atualizada com sucesso.' });
          this.profileForm.get('foto').setValue(img.foto);
          this.authenticatedUserService.updateServidor(this.profileForm.value);
          this.closeCropModal();
        },
        error => {
          this.isUpdatingPicture = false;
          this.messageService.sendError({ detail: error.json().msg || 'Erro no envio da foto.' });
          this.closeCropModal();
          delay(_ => this.closeModal());
        }
      );
    }
  }

  closeCropModal(): void {
    this.imgFileName = null;
    this.visibleCropModal = false;
    this.cropper.reset();
  }

  ngOnDestroy() {
    if (this.imageListenerSubscription) {
      this.imageListenerSubscription.unsubscribe();
    }
  }
}
