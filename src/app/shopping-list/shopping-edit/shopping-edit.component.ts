import {
   Component,
   ElementRef,
   ViewChild,
   EventEmitter,
   Output,
} from '@angular/core';
import { Ingredient } from '../../shared/ingriedients.model';

@Component({
   selector: 'app-shopping-edit',
   templateUrl: './shopping-edit.component.html',
   styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
   @ViewChild('nameInput') nameInputRef: ElementRef;
   @ViewChild('amountInput') amountInputRef: ElementRef;
   @Output() ingriedientAdded = new EventEmitter<Ingredient>();

   onAddItem() {
      const ingName = this.nameInputRef.nativeElement.value;
      const ingAmount = this.amountInputRef.nativeElement.value;
      const newIngriedient = new Ingredient(ingName, ingAmount);
      this.ingriedientAdded.emit(newIngriedient);
   }
}
