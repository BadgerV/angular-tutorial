import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

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
   user = new BehaviorSubject<User>(null);
   private tokenExpirationTimer: any;

   constructor(private http: HttpClient, private router: Router) {}
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
      this.user.next(null);
      this.router.navigate(['/auth']);
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

   autoLogin() {
      const userData: {
         email: string;
         id: string;
         _token: string;
         _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
         return;
      }

      const loadedUser = new User(
         userData.email,
         userData.id,
         userData._token,
         new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
         this.user.next(loadedUser);

         const expirationDate =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
         this.autoLogout(expirationDate);
      }
   }

   private handleAuthentication(
      email: string,
      userId: string,
      token: string,
      expiresIn: number
   ) {
      const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
      const user = new User(email, userId, token, expirationDate);

      this.user.next(user);
      this.autoLogout(expiresIn * 1000);

      localStorage.setItem('userData', JSON.stringify(user));
   }
}
