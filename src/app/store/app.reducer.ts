import * as fromShoppinglist from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
   shoppingList: fromShoppinglist.State;
   auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
   shoppingList: fromShoppinglist.shoppinglistReducer,
   auth: fromAuth.authReducer,
};
