import { Ingredient } from '../shared/ingriedients.model';

export class Recipe {
   public name: string;
   public description: string;
   public imagePath: string;
   public ingredients: Ingredient[];

   constructor(
      name: string,
      desc: string,
      image: string,
      ingredients: Ingredient[]
   ) {
      this.name = name;
      this.description = desc;
      this.imagePath = image;
      this.ingredients = ingredients;
   }
}
