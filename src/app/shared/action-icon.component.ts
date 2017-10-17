import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'uns-action-icon',
  templateUrl: 'action-icon.component.html',
  styleUrls: ['action-icon.component.css']
})
export class ActionIconComponent implements OnInit {

  @Input() icon: string;
  @Input() label: string;

  @Input() styleClass: string;
  @Input() position: string;
  @Input() topPosition: string;
  @Input() rightPosition: string;

  constructor() { }

  ngOnInit() { }
}
