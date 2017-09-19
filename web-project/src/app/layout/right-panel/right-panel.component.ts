import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uns-right-panel',
  templateUrl: 'right-panel.component.html',
  styleUrls: ['right-panel.component.css']
})
export class RightPanelComponent implements OnInit {

  news: any[];

  constructor() { }

  ngOnInit() {
    this.news = [
      { name: 'Notícia 1' },
      { name: 'Notícia 2' },
      { name: 'Notícia 3' },
      { name: 'Notícia 4' },
    ];
  }
}
