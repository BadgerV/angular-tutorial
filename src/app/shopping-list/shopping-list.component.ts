import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingriedients.model';
import { ShoppingListService } from './shoppingList.service';
import { Subscription } from 'rxjs';
import { LogginService } from '../logging.service';
import { Observable } from 'rxjs-compat';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
   selector: 'app-shopping-list',
   templateUrl: './shopping-list.component.html',
   styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
   ingredients: Observable<{ ingredients: Ingredient[] }>;
   private subscription: Subscription;

   constructor(
      private shoppingListService: ShoppingListService,
      private loggingService: LogginService,
      private store: Store<fromShoppingList.AppState>
   ) {}

   ngOnInit(): void {
      this.ingredients = this.store.select('shoppingList');

      this.loggingService.printLog('Hello from shopping list ocmpoentn ');
   }

   onEditItem(id: number) {
      // this.shoppingListService.startedEditing.next(id);

      this.store.dispatch(new ShoppingListActions.StartEdit(id));
   }

   ngOnDestroy(): void {}
}
