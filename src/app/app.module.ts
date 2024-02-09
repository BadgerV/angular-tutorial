import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shoppingList.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';

import { RecipeService } from './recipes/recipe.service';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
   declarations: [AppComponent, HeaderComponent, PageNotFoundComponent],
   imports: [
      BrowserModule,

      HttpClientModule,
      AppRoutingModule,

      SharedModule,
      CoreModule,
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
