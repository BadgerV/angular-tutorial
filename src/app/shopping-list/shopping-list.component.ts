import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingriedients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomataoes', 5),
    new Ingredient('Oranges', 5),
  ];
}
