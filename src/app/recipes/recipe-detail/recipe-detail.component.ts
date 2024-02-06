import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipes.model';

@Component({
   selector: 'app-recipe-detail',
   templateUrl: './recipe-detail.component.html',
   styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
   id: number;
   recipe: Recipe;
   constructor(
      private recipeService: RecipeService,
      private route: ActivatedRoute
   ) {}

   ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
         this.id = +params['id'];
         this.recipe = this.recipeService.getRecipe(this.id);
      });
   }

   onAddToShoppingList() {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
   }
}
