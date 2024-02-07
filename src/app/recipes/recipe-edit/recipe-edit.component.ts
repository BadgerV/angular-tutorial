import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
   selector: 'app-recipe-edit',
   templateUrl: './recipe-edit.component.html',
   styleUrls: ['./recipe-edit.component.css'], // Corrected property name
})
export class RecipeEditComponent implements OnInit {
   id: number;
   editMode = false;
   recipeForm: FormGroup;

   constructor(
      private route: ActivatedRoute,
      private recipeService: RecipeService,
      private router: Router
   ) {}

   ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
         this.id = +params['id'];

         this.editMode = typeof this.id === 'number' && this.id >= 0;
         console.log(this.editMode);

         this.initForm();
      });
   }

   private initForm() {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      let recipeIngredient = new FormArray([]);

      if (this.editMode) {
         console.log('working');
         const recipe = this.recipeService.getRecipe(this.id);

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
         this.recipeService.updateRecipe(this.id, this.recipeForm.value);
         this.onCancel();
      } else {
         this.recipeService.addRecipe(this.recipeForm.value);
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
}
