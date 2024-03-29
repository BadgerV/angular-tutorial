import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
   kind?: string;
   idToken: string;
   email: string;
   refreshToken: string;

   expiresIn: string;
   localId: string;
   registered?: boolean;
   displayName?: string;
}

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   // user = new BehaviorSubject<User>(null);
   private tokenExpirationTimer: any;

   constructor(
      private http: HttpClient,
      private router: Router,
      private store: Store<fromApp.AppState>
   ) {}
   signUp(email: string, password: string) {
      return this.http
         .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
               environment.firebaseAPIKey,
            {
               email: email,
               password: password,
               returnSecureToken: true,
            }
         )
         .pipe(
            catchError((errorRes) => this.handleError(errorRes)),
            tap((resData) =>
               this.handleAuthentication(
                  resData.email,
                  resData.localId,
                  resData.idToken,
                  +resData.expiresIn
               )
            )
         );
   }

   login(email: string, password: string) {
      return this.http
         .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
               environment.firebaseAPIKey,
            {
               email,
               password,
               returnSecureToken: true,
            }
         )
         .pipe(
            catchError((errorRes) => this.handleError(errorRes)),
            tap((resData) => {
               this.handleAuthentication(
                  resData.email,
                  resData.localId,
                  resData.idToken,
                  +resData.expiresIn
               );
            })
         );
   }

   logout() {
      // this.user.next(null);
      this.store.dispatch(new AuthActions.Logout());
      // this.router.navigate(['/auth']);
      localStorage.removeItem('userData');
      if (this.tokenExpirationTimer) {
         clearTimeout(this.tokenExpirationTimer);
      }

      this.tokenExpirationTimer = null;
   }

   autoLogout(expirationDuration: number) {
      console.log(expirationDuration);
      this.tokenExpirationTimer = setTimeout(() => {
         this.logout();
      }, expirationDuration);
   }

   private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = 'An unknown error occured';
      console.log(errorRes);

      if (!errorRes.error || !errorRes.error.error) {
         return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
         case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';

         case 'INVALID_LOGIN_CREDENTIALS':
            errorMessage = 'Incorrect usernamee or password';

         case 'INVALID_PASSWORD':
            errorMessage = 'Incorrect password';
      }

      return throwError(errorMessage);
   }

   autoLogin() {}

   private handleAuthentication(
      email: string,
      userId: string,
      token: string,
      expiresIn: number
   ) {
      const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
      const user = new User(email, userId, token, expirationDate);

      // this.user.next(user);
      this.store.dispatch(
         new AuthActions.AuthenticateSuccess({
            email: email,
            userId: userId,
            token: token,
            expirationDate: expirationDate,
            redirect: false,
         })
      );
      this.autoLogout(expiresIn * 1000);

      localStorage.setItem('userData', JSON.stringify(user));
   }
}
