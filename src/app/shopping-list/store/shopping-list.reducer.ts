import { Ingredient } from '../../shared/ingriedients.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
   ingredients: Ingredient[];
   editedIngredient: Ingredient;
   editedIngredientIndex: number;
}

const initialState: State = {
   ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
   editedIngredient: null,
   editedIngredientIndex: -1,
};

export function shoppinglistReducer(state: State = initialState, action: any) {
   switch (action.type) {
      case ShoppingListActions.ADD_INGREDIENT:
         return {
            ...state,
            ingredients: [...state.ingredients, action.payload],
         };

      case ShoppingListActions.ADD_INGREDIENTS:
         return {
            ...state,
            ingredients: [...state.ingredients, ...action.payload],
         };

      case ShoppingListActions.UPDATE_INGREDIENT:
         const ingredient = state.ingredients[state.editedIngredientIndex];

         const updateIngredient = {
            ...ingredient,
            ...action.payload,
         };

         const updatedIngredients = [...state.ingredients];

         updatedIngredients[state.editedIngredientIndex] = updateIngredient;
         return {
            ...state,
            ingredients: updatedIngredients,
            editedIngredientIndex: -1,
            editedIngredient: null,
         };

      case ShoppingListActions.DELETE_INGREDIENT:
         return {
            ...state,
            ingredients: state.ingredients.filter(
               (ig, igIndex) => igIndex !== state.editedIngredientIndex
            ),
            editedIngredientIndex: -1, // Reset the editedIngredientIndex after deletion
            editedIngredient: null, // Reset the editedIngredient as well
         };
      case ShoppingListActions.START_EDIT:
         return {
            ...state,
            editedIngredientIndex: action.payload,
            editedIngredient: { ...state.ingredients[action.payload] },
         };

      case ShoppingListActions.STOP_EDIT:
         console.log("deleting");
         return {
            ...state,
            editedIngredient: null,
            editedIngredientIndex: -1,
         };

      default:
         return state;
   }
}
