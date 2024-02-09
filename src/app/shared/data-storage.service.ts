import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import { exhaustMap, map, tap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
   providedIn: 'root',
})
export class DataStorageService {
   constructor(
      private http: HttpClient,
      private recipeService: RecipeService,
      private authService: AuthService
   ) {}

   storeRecipes() {
      const recipes = this.recipeService.getRecipes();
      let serachParams = new HttpParams();

      serachParams = serachParams.append('void', 'the void');

      this.http
         .put(
            'https://ng-course-recipe-book-6a66a-default-rtdb.firebaseio.com/recipes.json',
            recipes,
            {
               params: serachParams,
            }
         )
         .subscribe((response) => console.log(response));
   }

   fetchRecipes() {
      return this.http
         .get<Recipe[]>(
            'https://ng-course-recipe-book-6a66a-default-rtdb.firebaseio.com/recipes.json'
         )
         .pipe(
            map((recipe) => {
               return recipe.map((recipe) => {
                  return {
                     ...recipe,
                     ingredients: recipe.ingredients ? recipe.ingredients : [],
                  };
               });
            }),
            tap((recipes) => {
               this.recipeService.setRecipes(recipes);
            })
         );
   }
}
