import { Component, Input } from '@angular/core';

@Component({
  selector: 'uns-spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['spinner.component.css']
})
export class SpinnerComponent {
  @Input('isLoading') visible: boolean;
  @Input() size: number = 40;
}
