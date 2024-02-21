import {
   Component,
   ComponentFactoryResolver,
   ViewChild,
   OnDestroy,
   OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlerComponent } from '../shared/alert/alert.componsnt';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy, OnInit {
   isLoginMode = true;
   isLoading = false;
   error: string = null;

   @ViewChild(PlaceholderDirective, { static: false })
   alertHost: PlaceholderDirective;

   private closeSub: Subscription;
   private storeSub: Subscription;

   constructor(
      private authService: AuthService,
      private router: Router,
      private componentFactoryResolver: ComponentFactoryResolver,
      private store: Store<fromApp.AppState>
   ) {}

   ngOnInit(): void {
      this.storeSub = this.store.select('auth').subscribe((authState) => {
         this.isLoading = authState.loading;
         this.error = authState.authError;

         if (this.error) {
            this.showErrorAlert(this.error);
         }
      });
   }

   onSwitchMode() {
      this.isLoginMode = !this.isLoginMode;
   }

   handleSetClose() {
      this.store.dispatch(new AuthActions.ClearError());
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
         // authOps = this.authService.login(email, password);
         this.store.dispatch(
            new AuthActions.LoginStart({ email: email, password: password })
         );
         form.reset();
      } else {
         // this.isLoading = true;
         this.store.dispatch(
            new AuthActions.SignupStart({ email: email, password: password })
         );
         form.reset();
      }

      // authOps.subscribe(
      //    (resData) => {
      //       console.log(resData);
      //       this.isLoading = false;

      //       this.router.navigate(['/recipes']);
      //    },
      //    (errorMessage) => {
      //       this.error = errorMessage;
      //       this.showErrorAlert(errorMessage);
      //       this.isLoading = false;
      //    }
      // );
   }

   private showErrorAlert(message: string) {
      const alertComponentFactory =
         this.componentFactoryResolver.resolveComponentFactory(AlerComponent);

      const hostViewContinerRef = this.alertHost.viewContainer;

      hostViewContinerRef.clear();

      const componentRef = hostViewContinerRef.createComponent(
         alertComponentFactory
      );

      componentRef.instance.message = message;
      this.closeSub = componentRef.instance.setClose.subscribe(() => {
         this.closeSub.unsubscribe();
         hostViewContinerRef.clear();
      });
   }

   ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      if (this.closeSub) {
         this.closeSub.unsubscribe();
      }

      if (this.storeSub) {
         this.storeSub.unsubscribe();
      }
   }
}
