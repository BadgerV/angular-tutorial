import {
   Component,
   Input,
   OnChanges,
   OnInit,
   SimpleChanges,
} from '@angular/core';

import { AuthService } from './auth/auth.service';
import { LogginService } from './logging.service';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions';
import * as fromApp from './store/app.reducer';
//just a frivolous comments
@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
   inputText: string = '';

   constructor(
      private authService: AuthService,
      private loggingService: LogginService,
      private store: Store<fromApp.AppState>
   ) {}

   ngOnInit(): void {
      // this.authService.autoLogin();
      this.store.dispatch(new AuthActions.AutoLogin());
      this.loggingService.printLog('Hello form App componetn ngOnint');
   }

   onInputChange(newValue: string) {
      console.log('Input changed:', newValue);
   }
}
