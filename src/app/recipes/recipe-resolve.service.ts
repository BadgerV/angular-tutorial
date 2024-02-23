// import { Injectable } from '@angular/core';
// import {
//    ActivatedRouteSnapshot,
//    Resolve,
//    RouterStateSnapshot,
// } from '@angular/router';
// import { Recipe } from './recipes.model';
// import { DataStorageService } from '../shared/data-storage.service';
// import { Observable } from 'rxjs';
// import { RecipeService } from './recipe.service';

import {
   ActivatedRouteSnapshot,
   Resolve,
   RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipes.model';
import { Observable, of } from 'rxjs';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipe.action';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';

// @Injectable({
//    providedIn: 'root',
// })

// export class RecipeResolverService implements Resolve<Recipe[]> {
//    constructor(
//       private dataStorrageService: DataStorageService,
//       private recipeService: RecipeService
//    ) {}

//    resolve(
//       route: ActivatedRouteSnapshot,
//       state: RouterStateSnapshot
//    ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
//       const recipes = this.recipeService.getRecipes();
//       if (recipes.length === 0) {
//          return this.dataStorrageService.fetchRecipes();
//       } else {
//          return recipes;
//       }
//    }
// }

@Injectable({
   providedIn: 'root',
})
export class RecipeResolverService implements Resolve<Recipe[]> {
   constructor(
      private recipeService: RecipeService,
      // private dataStorageService: DataStorageService
      private store: Store<fromApp.AppState>,
      private actions$: Actions
   ) {}
   resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
      const recipes = this.recipeService.getRecipes();

      if (recipes.length === 0) {
         // return this.dataStorageService.fetchRecipes();
         return this.store.select('recipes').pipe(
            take(1),
            map((recipesState) => {
               return recipesState.recipes;
            }),
            switchMap((recipes) => {
               if (recipes.length === 0) {
                  this.store.dispatch(new RecipesActions.FetchRecipes());
                  return this.actions$.pipe(
                     ofType(RecipesActions.SET_RECIPES),
                     take(1)
                  );
               } else {
                  return of(recipes);
               }
            })
         );
      } else {
         return recipes;
      }
   }
}
