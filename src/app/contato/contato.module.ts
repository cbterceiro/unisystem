import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ContatoComponent } from './contato.component';

import { ContatoRoutingModule } from './contato-routing.module';

@NgModule({
    imports: [
        ContatoRoutingModule,
        SharedModule,
    ],
    exports: [],
    declarations: [
        ContatoComponent,
    ],
    providers: [],
})
export class ContatoModule { }
