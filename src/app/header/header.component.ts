import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesAction from '../recipes/store/recipe.action';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
   constructor(
      private dataStorageService: DataStorageService,
      private authService: AuthService,
      private store: Store<fromApp.AppState>
   ) {}

   private userSub: Subscription;
   isAuthenticated = false;

   ngOnInit(): void {
      this.userSub = this.store
         .select('auth')
         .pipe(
            map((authState) => {
               return authState.user;
            })
         )
         .subscribe((user) => {
            this.isAuthenticated = !!user;
         });
   }
   onSaveData() {
      // this.dataStorageService.storeRecipes();
      this.store.dispatch(new RecipesAction.Storerecipes());
   }

   onFetchData() {
      // this.dataStorageService.fetchRecipes().subscribe();
      this.store.dispatch(new RecipesAction.FetchRecipes());
   }

   onLogout() {
      // this.authService.logout();
      this.store.dispatch(new AuthActions.Logout());
   }
   ngOnDestroy(): void {
      this.userSub.unsubscribe();
   }
}
