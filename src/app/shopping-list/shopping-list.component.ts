import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingriedients.model';
import { ShoppingListService } from './shoppingList.service';
import { Subscription } from 'rxjs';
import { LogginService } from '../logging.service';

@Component({
   selector: 'app-shopping-list',
   templateUrl: './shopping-list.component.html',
   styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
   ingredients: Ingredient[] = [];
   private subscription: Subscription;

   constructor(
      private shoppingListService: ShoppingListService,
      private loggingService: LogginService
   ) {}

   ngOnInit(): void {
      this.ingredients = this.shoppingListService.getIngredients();
      this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
         (ingredients: Ingredient[]) => (this.ingredients = ingredients)
      );

      this.loggingService.printLog('Hello from shopping list ocmpoentn ');
   }

   onEditItem(id: number) {
      this.shoppingListService.startedEditing.next(id);
   }

   ngOnDestroy(): void {
      this.subscription.unsubscribe();
   }
}
