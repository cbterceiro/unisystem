import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CadastroNoticiasComponent } from './cadastro-noticias.component';

import { CadastroNoticiasRoutingModule} from './cadastro-noticias-routing.module';

@NgModule({
    imports: [
        CadastroNoticiasRoutingModule,
        SharedModule
    ],
    exports: [],
    declarations: [CadastroNoticiasComponent],
    providers: [],
})
export class CadastroNoticiasModule { }
