import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

const shopingListRoutes: Routes = [
   {
      path: '',
      component: ShoppingListComponent,
      children: [
         {
            path: ':id/edit',
            component: ShoppingEditComponent,
         },
      ],
   },
];

@NgModule({
   declarations: [ShoppingListComponent, ShoppingEditComponent],
   imports: [
      RouterModule.forChild(shopingListRoutes),
      FormsModule,
      CommonModule,
   ],
})
export class ShoppingListModule {}
