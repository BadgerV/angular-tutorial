import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipes.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import * as RecipesAction from '../store/recipe.action';

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
      private route: ActivatedRoute,
      private router: Router,
      private store: Store<fromApp.AppState>
   ) {}

   ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
         this.id = +params['id'];
         // this.recipe = this.recipeService.getRecipe(this.id);
         this.store
            .select('recipes')
            .pipe(
               map((recipeState) => {
                  return recipeState.recipes.find((recipe, index) => {
                     return index === this.id;
                  });
               })
            )
            .subscribe((recipe) => {
               this.recipe = recipe;
            });
      });
   }

   onAddToShoppingList() {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
   }

   onEditRecipe() {
      // this.router.navigate(['edit'], { relativeTo: this.route });
      this.router.navigate(['../', this.id, 'edit'], {
         relativeTo: this.route,
      });
   }

   onDeleteRecipe() {
      // this.recipeService.deleteRecipe(this.id);
      this.store.dispatch(new RecipesAction.DeleteRecipe(this.id));
      this.router.navigate(['../'], { relativeTo: this.route });
   }
}
