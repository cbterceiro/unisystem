import { FormGroup } from '@angular/forms';

export function markFormGroupDirty(formGroup: FormGroup): void {
  (<any>Object).values(formGroup.controls).forEach(control => {
    control.markAsDirty();

    if (control.controls) {
      control.controls.forEach(c => markFormGroupDirty(c));
    }
  });
}

export function delay(fn: any, timeout?: number): any {
  return setTimeout(fn, timeout || 0);
}
