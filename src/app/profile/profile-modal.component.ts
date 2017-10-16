import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem, DomHandler } from 'primeng/primeng';

import { markFormGroupDirty } from '../shared/functions';

import { SessionService, SessionKeys, MessageService } from '../core';

import { ServidorService, Servidor } from '../core/';

import { AuthenticationService } from '../authentication/';

import { environment } from '../../environments/environment';

@Component({
  selector: 'uns-profile-modal',
  templateUrl: 'profile-modal.component.html',
  styleUrls: ['profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {

  visible: boolean;
  isSubmitting: boolean;

  imageUploadUrl: string;

  profileForm: FormGroup;

  maritalStatuses: SelectItem[];
  nationalities: SelectItem[];
  states: SelectItem[];
  calendarYearRange: string;
  today: Date = new Date();

  dialogElement: HTMLElement;
  dialogElementHeight: number;

  routeParamsSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private servidorService: ServidorService,
    private sessionService: SessionService,
    private messageService: MessageService,
    private domHandler: DomHandler,
    private el: ElementRef,
    private renderer: Renderer2,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.subscribeToRouteParams();
    this.setupForm();
    this.setYearRange();
    this.loadServidor();
  }

  ngAfterViewInit() {
    this.updateBackgroundImage();
  }

  subscribeToRouteParams(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(params => {
      this.visible = params['show'] || false;
    });
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

  loadServidor(): void {
    const servidor: Servidor = this.authenticationService.getAuthenticatedUser();
    this.imageUploadUrl = this.servidorService.getImageUrl(servidor.id);
    this.profileForm.patchValue(servidor);
  }

  select(event): void {
    console.log('select date', event)
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
      });
    } else {
      markFormGroupDirty(this.profileForm);
    }
  }

  closeModal(): void {
    this.visible = false;
    // Navega para a rota atual apenas alterando o parâmetro de exibição
    this.router.navigate(['./', { show: false }], { skipLocationChange: true, relativeTo: this.activatedRoute });
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

  updateBackgroundImage() {
    const servidor: Servidor = this.authenticationService.getAuthenticatedUser();
    const element = this.el.nativeElement.querySelector('p-fileupload .ui-fileupload-choose');
    if (servidor.foto && element) {
      this.renderer.setStyle(element, 'background-image', `url('${servidor.foto}')`);
    }
  }

  onBeforeUpload(event) {
    console.log('onBeforeUpload', event);
    this.messageService.sendInfo({ detail: 'Iniciando o envio' });
  }

  onUpload(event) {
    console.log('onUpload', event);
    this.messageService.sendSuccess({ detail: 'Envio concluído' });
  }

  onUploadError(event) {
    console.log('onUploadError', event);
    this.messageService.sendError({ detail: 'Envio com erro' });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
