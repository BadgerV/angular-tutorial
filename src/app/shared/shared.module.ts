import { NgModule } from '@angular/core';
import { AlerComponent } from './alert/alert.componsnt';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
   declarations: [
      AlerComponent,
      LoadingSpinnerComponent,
      PlaceholderDirective,
      DropdownDirective,
   ],
   imports: [CommonModule],
   exports: [
      AlerComponent,
      LoadingSpinnerComponent,
      DropdownDirective,
      PlaceholderDirective,
      CommonModule,
   ],
})
export class SharedModule {}
