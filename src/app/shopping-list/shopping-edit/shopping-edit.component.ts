import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingriedients.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
   selector: 'app-shopping-edit',
   templateUrl: './shopping-edit.component.html',
   styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
   @ViewChild('nameInput') nameInputRef: ElementRef;
   @ViewChild('amountInput') amountInputRef: ElementRef;

   constructor(private shoppingListService: ShoppingListService) {}

   onAddItem() {
      const ingName = this.nameInputRef.nativeElement.value;
      const ingAmount = this.amountInputRef.nativeElement.value;
      const newIngriedient = new Ingredient(ingName, ingAmount);
      this.shoppingListService.addIngredient(newIngriedient);
   }
}
