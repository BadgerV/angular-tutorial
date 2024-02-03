import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
   selector: 'app-recipe-list',
   templateUrl: './recipe-list.component.html',
   styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
   @Output() recipeWasSelected = new EventEmitter<Recipe>();
   recipes: Recipe[] = [
      new Recipe(
         'A test recipe',
         'This is simply a test',
         'https://www.simplyrecipes.com/thmb/GjaB8D6OyVIAfA_BpGuXr-6eNBU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Baklava-LEAD-11-b2a228e6db9f43d697ae3aed378d0b2a.jpg'
      ),
      new Recipe(
         'Another test recipe',
         'This is simply a test',
         'https://www.simplyrecipes.com/thmb/GjaB8D6OyVIAfA_BpGuXr-6eNBU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Baklava-LEAD-11-b2a228e6db9f43d697ae3aed378d0b2a.jpg'
      ),
   ];

   constructor() {}

   onRecipeSelected(recipe: Recipe) {
      this.recipeWasSelected.emit(recipe);
   }
}
