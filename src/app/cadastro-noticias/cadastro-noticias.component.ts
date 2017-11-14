import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'uns-cadastro-noticias',
    templateUrl: 'cadastro-noticias.component.html',
    styleUrls: ['cadastro-noticias.component.css']
})

export class CadastroNoticiasComponent implements OnInit {

    noticia: string;

    noticias: string[] = [];

    constructor() { }

    ngOnInit() { }

    publish(): void {
        if (this.noticia) {
            this.noticias.push(this.noticia);
            this.noticia = '';
        }
    }

    cancel(): void {
        this.noticia = '';
    }
}
