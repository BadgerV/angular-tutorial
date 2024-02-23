import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import * as RecipesAction from '../store/recipe.action';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-recipe-edit',
   templateUrl: './recipe-edit.component.html',
   styleUrls: ['./recipe-edit.component.css'], // Corrected property name
})
export class RecipeEditComponent implements OnInit, OnDestroy {
   id: number;
   editMode = false;
   recipeForm: FormGroup;
   private storeSub: Subscription;

   constructor(
      private route: ActivatedRoute,
      private recipeService: RecipeService,
      private router: Router,
      private store: Store<fromApp.AppState>
   ) {}

   ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
         this.id = +params['id'];

         this.editMode = typeof this.id === 'number' && this.id >= 0;

         this.initForm();
      });
   }

   private initForm() {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      let recipeIngredient = new FormArray([]);

      if (this.editMode) {
         const recipe = this.recipeService.getRecipe(this.id);
         this.storeSub = this.store
            .select('recipes')
            .pipe(
               map((recipeState) => {
                  return recipeState.recipes.find((recipe, index) => {
                     return index === this.id;
                  });
               })
            )
            .subscribe((recipe) => {
               recipeName = recipe.name;
               recipeImagePath = recipe.imagePath;
               recipeDescription = recipe.description;

               if (recipe['ingredients']) {
                  for (let ingredient of recipe.ingredients) {
                     recipeIngredient.push(
                        new FormGroup({
                           name: new FormControl(
                              ingredient.name,
                              Validators.required
                           ),
                           amount: new FormControl(ingredient.amount, [
                              Validators.required,
                              Validators.pattern(/^[1-9][0-9]*$/),
                           ]),
                        })
                     );
                  }
               }
            });
      }

      this.recipeForm = new FormGroup({
         name: new FormControl(recipeName, Validators.required),
         imagePath: new FormControl(recipeImagePath, Validators.required),
         description: new FormControl(recipeDescription, Validators.required),
         ingredients: recipeIngredient,
      });
   }

   onSubmit() {
      if (this.editMode) {
         // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
         this.store.dispatch(
            new RecipesAction.UpdateRecipe({
               index: this.id,
               newRecipe: this.recipeForm.value,
            })
         );
         this.onCancel();
      } else {
         // this.recipeService.addRecipe(this.recipeForm.value);
         this.store.dispatch(
            new RecipesAction.Addrecipe(this.recipeForm.value)
         );
         this.onCancel();
      }
   }

   onAddIngredient() {
      (<FormArray>this.recipeForm.get('ingredients')).push(
         new FormGroup({
            name: new FormControl(null, [Validators.required]),
            amount: new FormControl(null, [
               Validators.required,
               Validators.pattern(/^[1-9][0-9]*$/),
            ]),
         })
      );
   }

   get controls() {
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
   }

   onCancel() {
      this.router.navigate(['../'], { relativeTo: this.route });
   }

   onDeleteIngredient(id: number) {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
   }

   ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      if (this.storeSub) {
         this.storeSub.unsubscribe();
      }
   }
}
