import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.action';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../recipes.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffetcs {
   fetchRecipes = createEffect(() =>
      this.actions$.pipe(
         ofType(RecipesActions.FETCH_REECIPES),
         switchMap(() => {
            // console.log("action is being called");
            return this.http.get<Recipe[]>(
               'https://ng-course-recipe-book-6a66a-default-rtdb.firebaseio.com/recipes.json'
            );
         }),
         map((recipe) => {
            return recipe.map((recipe) => {
               return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : [],
               };
            });
         }),
         map((recipes) => {
            return new RecipesActions.SetRecipes(recipes);
         })
      )
   );

   storeRecipes = createEffect(
      () =>
         this.actions$.pipe(
            ofType(RecipesActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipesState]) => {
               return this.http.put(
                  'https://ng-course-recipe-book-6a66a-default-rtdb.firebaseio.com/recipes.json',
                  recipesState.recipes
               );
            })
         ),
      {
         dispatch: false,
      }
   );

   constructor(
      private actions$: Actions,
      private http: HttpClient,
      private store: Store<fromApp.AppState>
   ) {}
}
