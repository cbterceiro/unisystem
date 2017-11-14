import { Component, OnInit } from '@angular/core';

import { NoticiaService, NoticiaExterna } from '../../core';

@Component({
  selector: 'uns-right-panel',
  templateUrl: 'right-panel.component.html',
  styleUrls: ['right-panel.component.css']
})
export class RightPanelComponent implements OnInit {

  news: NoticiaExterna[];
  isLoading: boolean;

  constructor(
    private noticiaService: NoticiaService,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.noticiaService.getNoticiasExternas().subscribe(noticias => {
      this.news = noticias;
      this.isLoading = false;
    });
  }
}
