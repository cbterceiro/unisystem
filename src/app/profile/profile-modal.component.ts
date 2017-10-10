import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem, DomHandler } from 'primeng/primeng';

import { markFormGroupDirty } from '../shared/functions';

import { SessionService, SessionKeys, MessageService } from '../core';

import { ServidorService } from './servidor.service';
import { Servidor } from './servidor.model';

@Component({
  selector: 'uns-profile-modal',
  templateUrl: 'profile-modal.component.html',
  styleUrls: ['profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {

  visible: boolean;

  profileForm: FormGroup;
  profileImageSource: string;

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
  ) { }

  ngOnInit() {
    this.subscribeToRouteParams();
    this.setupForm();
    this.setYearRange();
    this.loadServidor();
  }

  subscribeToRouteParams(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(params => {
      this.visible = params['show'] || false;
    });
  }

  setupForm(): void {
    this.setupDropdownOptions();

    this.profileImageSource = '/assets/img/default-user-icon.png';

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
    const name: string = this.sessionService.getItem(SessionKeys.user).username;
    if (name) {
      this.servidorService.getByName(name).subscribe(servidor => {
        this.profileForm.patchValue(servidor);
      });
    }
  }

  changePicture(): void {

  }

  onSubmit(isValid: boolean, servidor: Servidor): void {
    if (isValid) {
      this.servidorService.save(servidor).subscribe(success => {
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

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
