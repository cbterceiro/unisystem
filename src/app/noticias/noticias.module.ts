import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { NoticiasComponent } from './noticias.component';

import { NoticiasRoutingModule } from './noticias-routing.module';

@NgModule({
    imports: [
        NoticiasRoutingModule,
        SharedModule,
    ],
    exports: [],
    declarations: [
        NoticiasComponent,
    ],
    providers: [],
})
export class NoticiasModule { }
