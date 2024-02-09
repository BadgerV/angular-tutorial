import {
   Component,
   Input,
   OnChanges,
   OnInit,
   SimpleChanges,
} from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
   inputText: string = '';

   constructor(private authService: AuthService) {}

   ngOnInit(): void {
      this.authService.autoLogin();
   }

   onInputChange(newValue: string) {
      console.log('Input changed:', newValue);
   }
}
