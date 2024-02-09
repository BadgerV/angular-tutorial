import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
   selector: 'app-alert',
   templateUrl: './alert.component.html',
   styleUrl: './alert.component.css',
})
export class AlerComponent {
   @Input() message: string;

   @Output() setClose = new EventEmitter();

   closeBox() {
      this.setClose.emit();
   }
}
