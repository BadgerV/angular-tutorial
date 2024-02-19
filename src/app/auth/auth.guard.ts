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

@Injectable({
   providedIn: 'root',
})
export class AuthGuard implements CanActivate {
   constructor(private authService: AuthService, private router: Router) {}

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Observable<boolean | UrlTree> | boolean {
      return this.authService.user.pipe(
         take(1),
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
