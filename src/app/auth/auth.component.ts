import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
})
export class AuthComponent {
   isLoginMode = true;
   isLoading = false;
   error: string = null;
   constructor(private authService: AuthService) {}
   onSwitchMode() {
      this.isLoginMode = !this.isLoginMode;
   }

   onSubmit(form: NgForm) {
      const email = form.value.email;
      const password = form.value.password;

      if (!form.valid) {
         return;
      }

      let authOps: Observable<AuthResponseData>;

      if (this.isLoginMode) {
         this.isLoading = true;
         authOps = this.authService.login(email, password);
         form.reset();
      } else {
         this.isLoading = true;
         authOps = this.authService.signUp(email, password);
         form.reset();
      }

      authOps.subscribe(
         (resData) => {
            console.log(resData);
            this.isLoading = false;
         },
         (errorMessage) => {
            this.error = errorMessage;
            this.isLoading = false;
         }
      );
   }
}
