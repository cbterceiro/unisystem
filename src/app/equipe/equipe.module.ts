import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { EquipeComponent } from './equipe.component';

import { EquipeRoutingModule } from './equipe-routing.module';

@NgModule({
    imports: [
        EquipeRoutingModule,
        SharedModule,
    ],
    exports: [],
    declarations: [
        EquipeComponent,
    ],
    providers: [],
})
export class EquipeModule { }
