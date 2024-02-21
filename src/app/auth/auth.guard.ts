import { Inject, Injectable } from '@angular/core';
import {
   ActivatedRouteSnapshot,
   RouterStateSnapshot,
   UrlTree,
   CanActivate,
   Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({
   providedIn: 'root',
})
export class AuthGuard implements CanActivate {
   constructor(
      private authService: AuthService,
      private router: Router,
      private store: Store<fromApp.AppState>
   ) {}

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Observable<boolean | UrlTree> | boolean {
      return this.store.select('auth').pipe(
         take(1),
         map((authState) => {
            return authState.user;
         }),
         map((user) => {
            if (user) {
               return true;
            } else {
               return this.router.createUrlTree(['/auth']);
            }
         })
      );
   }
}
