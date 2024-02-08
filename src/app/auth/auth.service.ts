import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { User } from './user.model';

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
   userSubject = new Subject<User>();
   
   constructor(private http: HttpClient) {}
   signUp(email: string, password: string) {
      return this.http
         .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxgjWcKF7KcwWjIPWKVDgcycmvadWqOpc',
            {
               email: email,
               password: password,
               returnSecureToken: true,
            }
         )
         .pipe(catchError((errorRes) => this.handleError(errorRes)));
   }

   login(email: string, password: string) {
      return this.http
         .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxgjWcKF7KcwWjIPWKVDgcycmvadWqOpc',
            {
               email,
               password,
               returnSecureToken: true,
            }
         )
         .pipe(catchError((errorRes) => this.handleError(errorRes)));
   }

   private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = 'An unknown error occured';

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
}
