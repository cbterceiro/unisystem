import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'uns-noticias',
    templateUrl: 'noticias.component.html',
    styleUrls: ['noticias.component.css']
})

export class NoticiasComponent implements OnInit {

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
