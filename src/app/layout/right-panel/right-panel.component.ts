import { Component, OnInit } from '@angular/core';

import { NoticiaService, Noticia } from '../../core';

@Component({
  selector: 'uns-right-panel',
  templateUrl: 'right-panel.component.html',
  styleUrls: ['right-panel.component.css']
})
export class RightPanelComponent implements OnInit {

  news: Noticia[];
  isLoading: boolean;

  constructor(
    private noticiaService: NoticiaService,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.noticiaService.getNoticias().subscribe(result => {
      this.news = result as Noticia[];
      this.isLoading = false;
    });
  }
}
