import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingriedients.model';

export class ShoppingListService {
   ingredientsChanged = new EventEmitter<Ingredient[]>();
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
      this.ingredientsChanged.emit(this.ingredients.slice());
   }

   addIngredients(ingriedients: Ingredient[]) {
      this.ingredients.push(...ingriedients);
      this.ingredientsChanged.emit(this.ingredients.slice());
   }
}
