import {
   Component,
   Input,
   OnChanges,
   OnInit,
   SimpleChanges,
} from '@angular/core';

import { AuthService } from './auth/auth.service';
import { LogginService } from './logging.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
   inputText: string = '';

   constructor(
      private authService: AuthService,
      private loggingService: LogginService
   ) {}

   ngOnInit(): void {
      this.authService.autoLogin();
      this.loggingService.printLog('Hello form App componetn ngOnint');
   }

   onInputChange(newValue: string) {
      console.log('Input changed:', newValue);
   }
}
