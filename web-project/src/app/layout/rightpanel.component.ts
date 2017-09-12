import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uns-rightpanel',
  templateUrl: 'rightpanel.component.html',
  styleUrls: ['rightpanel.component.css']
})
export class RightpanelComponent implements OnInit {

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
