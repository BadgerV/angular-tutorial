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
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Injectable } from '@angular/core';

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
      private dataStorageService: DataStorageService
   ) {}
   resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
      const recipes = this.recipeService.getRecipes();

      if (recipes.length === 0) {
         return this.dataStorageService.fetchRecipes();
      } else {
         return recipes;
      }
   }
}
