import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { NoticiasComponent } from './noticias.component';
import { NoticiaFormComponent } from './noticia-form.component';

import { NoticiasRoutingModule } from './noticias-routing.module';

@NgModule({
    imports: [
        NoticiasRoutingModule,
        SharedModule,
    ],
    exports: [],
    declarations: [
        NoticiasComponent,
        NoticiaFormComponent,
    ],
    providers: [],
})
export class NoticiasModule { }
