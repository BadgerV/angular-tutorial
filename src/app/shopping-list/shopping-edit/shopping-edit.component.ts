import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingriedients.model';
import { ShoppingListService } from '../shoppingList.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-shopping-edit',
   templateUrl: './shopping-edit.component.html',
   styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
   @ViewChild('f', { static: false }) slForm: NgForm;

   subscription: Subscription;
   editMode: boolean = false;
   editedItemIndex: number;
   editedItem: Ingredient;

   constructor(private shoppingListService: ShoppingListService) {}

   ngOnInit(): void {
      this.subscription = this.shoppingListService.startedEditing.subscribe(
         (id: number) => {
            this.editedItemIndex = id;
            this.editMode = true;
            this.editedItem = this.shoppingListService.getIngredient(id);
            this.slForm.setValue({
               name: this.editedItem.name,
               amount: this.editedItem.amount,
            });
         }
      );
   }

   onAddItem(form: NgForm) {
      const value = form.value;
      const newIngredient = new Ingredient(value.name, value.amount);
      if (this.editMode) {
         this.shoppingListService.updateIngredient(
            this.editedItemIndex,
            newIngredient
         );
      } else {
         this.shoppingListService.addIngredient(newIngredient);
      }
      this.editMode = false;
      form.reset();
   }
   onClear() {
      this.slForm.reset();
      this.editMode = false;
   }

   onDelete() {
      this.onClear();
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
   }

   ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.subscription.unsubscribe();
   }
}
