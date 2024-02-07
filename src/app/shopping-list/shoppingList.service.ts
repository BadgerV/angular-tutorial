import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingriedients.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
   ingredientsChanged = new Subject<Ingredient[]>();
   startedEditing = new Subject<number>();
   private ingredients: Ingredient[] = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomataoes', 5),
      new Ingredient('Oranges', 5),
   ];
   getIngredients() {
      return this.ingredients.slice();
   }

   addIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      this.ingredientsChanged.next(this.ingredients.slice());
   }

   addIngredients(ingriedients: Ingredient[]) {
      this.ingredients.push(...ingriedients);
      this.ingredientsChanged.next(this.ingredients.slice());
   }

   getIngredient(index: number) {
      return this.ingredients[index];
   }

   updateIngredient(index: number, newIngredient) {
      this.ingredients[index] = newIngredient;

      this.ingredientsChanged.next(this.ingredients.slice());
   }

   deleteIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
   }
}
