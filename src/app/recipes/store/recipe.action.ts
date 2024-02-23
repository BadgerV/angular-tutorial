import { Action } from '@ngrx/store';
import { Recipe } from '../recipes.model';

export const SET_RECIPES = '[Recipes] Set recipes';
export const FETCH_REECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipes';
export const UPDATE_RECIPE = '[Recipes] Update Recipes';
export const DELETE_RECIPE = '[Recipes] Delete Recipes';
export const STORE_RECIPES = '[Recipes] Store Recipes';

export class SetRecipes implements Action {
   readonly type: string = SET_RECIPES;

   constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
   readonly type: string = FETCH_REECIPES;
}

export class Addrecipe implements Action {
   readonly type: string = ADD_RECIPE;

   constructor(public payload: Recipe) {}
}
export class UpdateRecipe implements Action {
   readonly type: string = UPDATE_RECIPE;

   constructor(public payload: { index: number; newRecipe: Recipe }) {}
}
export class DeleteRecipe implements Action {
   readonly type: string = DELETE_RECIPE;

   constructor(public payload: number) {}
}

export class Storerecipes implements Action {
   readonly type: string = STORE_RECIPES;
}

export type RecipesActions =
   | SetRecipes
   | FetchRecipes
   | Addrecipe
   | UpdateRecipe
   | DeleteRecipe
   | Storerecipes
   | any;
