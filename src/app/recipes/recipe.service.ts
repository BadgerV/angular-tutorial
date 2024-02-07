import { Recipe } from './recipes.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingriedients.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
   recipesChanged = new Subject<Recipe[]>();
   constructor(private shoppingListService: ShoppingListService) {}

   private recipes: Recipe[] = [
      new Recipe(
         "Chef John's American Goulash",
         "American goulash was one of my all-time favorite comfort food meals when I was growing up. They served it in my school cafeteria alongside a slice of buttered white bread and a carton of milk. This Americanized version of goulash was invented to stretch a small amount of beef into enough food for a not-so-small family. It's a simple dish that doesn't taste simple, so it's perfect for your weeknight dinner rotation",
         'https://www.allrecipes.com/thmb/PRdvCnLoAVdnsxyrmNn7lLQ2bTo=/160x90/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/JF_275489_ChefJohnsAmericanGoulash_4x3_13361-0bec55d8f2ea474a9bf4af7fb0a01ec1.jpg',
         [
            new Ingredient('Olive oil', 1),
            new Ingredient('Ground beef', 2),
            new Ingredient('Onion', 1),
            new Ingredient('Garlic', 4),
            new Ingredient('Bay leaves', 2),
            new Ingredient('Paprika', 2),
            new Ingredient('Italian seasoning', 2),
            new Ingredient('Kosher salt', 2),
            new Ingredient('Ground black pepper', 0.5),
            new Ingredient('Cayenne pepper', 1),
            new Ingredient('Chicken broth', 1),
            new Ingredient('Marinara sauce', 1),
            new Ingredient('Diced tomatoes', 1),
            new Ingredient('Water', 1),
            new Ingredient('Soy sauce', 2),
            new Ingredient('Elbow macaroni', 2),
            new Ingredient('Italian parsley', 0.25),
            new Ingredient('White Cheddar cheese', 1),
         ]
      ),
      new Recipe(
         'Spaghetti Bolognese',
         'A classic Italian dish featuring a rich and hearty meat sauce served over cooked spaghetti. This comforting recipe is a family favorite and sure to please any pasta lover.',
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLzqTDL-G2eFieSiTyGm-nqT1YZXoruyDxOy-CqhV6IgytN8mg_It&usqp=CAE&s', // Replace with the actual image URL
         [
            new Ingredient('Olive oil', 2),
            new Ingredient('Ground beef', 1),
            new Ingredient('Onion, finely chopped', 1),
            new Ingredient('Garlic, minced', 3),
            new Ingredient('Carrot, grated', 1),
            new Ingredient('Celery, finely chopped', 1),
            new Ingredient('Canned crushed tomatoes', 1),
            new Ingredient('Tomato paste', 2),
            new Ingredient('Red wine', 1),
            new Ingredient('Dried oregano', 1),
            new Ingredient('Dried basil', 1),
            new Ingredient('Salt and pepper, to taste', 3),
            new Ingredient('Fresh parsley, chopped (for garnish)', 5),
            new Ingredient('Grated Parmesan cheese (optional)', 5),
            new Ingredient('Cooked spaghetti, for serving', 6),
         ]
      ),
      new Recipe(
         'Chicken Stir-Fry',
         'A quick and healthy stir-fry recipe with tender chicken, colorful vegetables, and a flavorful sauce. Perfect for busy weeknights when you want a delicious meal in minutes.',
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTKZzL5BkR7kdTtROc28_j7XQM5oVyiYz8tncP4LDJkLisoLiJIFU-&usqp=CAE&s', // Replace with the actual image URL
         [
            new Ingredient(
               'Boneless, skinless chicken breasts, thinly sliced',
               2
            ),
            new Ingredient('Broccoli florets', 1),
            new Ingredient('Bell peppers (mix of colors), sliced', 2),
            new Ingredient('Carrot, julienned', 1),
            new Ingredient('Snow peas, trimmed', 1),
            new Ingredient('Soy sauce', 3),
            new Ingredient('Sesame oil', 1),
            new Ingredient('Honey', 1),
            new Ingredient('Fresh ginger, grated', 1),
            new Ingredient('Garlic, minced', 3),
            new Ingredient('Cornstarch', 1),
            new Ingredient('Cooked white rice, for serving', 5),
            new Ingredient('Green onions, sliced (for garnish)', 9),
            new Ingredient('Toasted sesame seeds (optional, for garnish)', 4),
         ]
      ),
   ];

   getRecipes() {
      return this.recipes.slice();
   }

   getRecipe(index: number) {
      return this.recipes.slice()[index];
   }

   addIngredientsToShoppingList(ingriedients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingriedients);
   }

   addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
   }

   updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
   }

   deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
   }
}
