import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SelectItem } from 'primeng/primeng';

import { ServidorService, Servidor } from '../core';

import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'uns-select-servidor',
  templateUrl: 'select-servidor.component.html',
  styleUrls: ['select-servidor.component.css']
})
export class SelectServidorComponent implements OnInit {

  loading: boolean;

  servidores: SelectItem[];
  servidorSelecionado: Servidor;

  errorMessage: string;

  constructor(
    private authenticationService: AuthenticationService,
    private servidorService: ServidorService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getServidores();
  }

  getServidores() {
    this.loading = true;
    this.servidorService.getAll().subscribe(servidores => {
      this.servidores = servidores.map(s => {
        return { label: s.nome, value: s };
      });
      this.servidores.unshift({ label: 'Selecione um servidor', value: null });
      this.loading = false;
    });
  }

  login() {
    if (this.servidorSelecionado) {
      this.authenticationService.setAuthenticatedUser(this.servidorSelecionado);
      this.router.navigate(['']);
    } else {
      this.errorMessage = 'Selecione um servidor';
    }
  }
}
