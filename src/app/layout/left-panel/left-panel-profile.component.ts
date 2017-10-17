import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthenticatedUserService } from '../../authentication';

@Component({
  selector: 'uns-left-panel-profile',
  templateUrl: 'left-panel-profile.component.html',
  styleUrls: ['left-panel-profile.component.css']
})
export class LeftPanelProfileComponent implements OnInit, OnDestroy {

  name: string;
  hideEditIcon = true;

  imageListenerSubscription: Subscription;

  constructor(
    private router: Router,
    private authenticatedUserService: AuthenticatedUserService,
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    const servidor = this.authenticatedUserService.getServidor();
    this.name = servidor.nome;
    this.updateBackgroundImage(servidor.foto);
    this.setupImageListener();
  }

  setupImageListener(): void {
    this.imageListenerSubscription = this.authenticatedUserService.listen().subscribe(servidor => {
      this.updateBackgroundImage(servidor.foto);
    });
  }

  showProfileModal(): void {
    this.router.navigate(['/profile', { show: true }], { skipLocationChange: true });
  }

  updateBackgroundImage(base64Img: string) {
    const element = this.el.nativeElement.querySelector('.profile-image');
    if (base64Img && element) {
      this.renderer.setStyle(element, 'background-image', `url('${base64Img}')`);
    }
  }

  ngOnDestroy() {
    if (this.imageListenerSubscription) {
      this.imageListenerSubscription.unsubscribe();
    }
  }
}
