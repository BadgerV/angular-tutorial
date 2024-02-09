import {
   Component,
   ComponentFactoryResolver,
   ViewChild,
   OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlerComponent } from '../shared/alert/alert.componsnt';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
   isLoginMode = true;
   isLoading = false;
   error: string = null;

   @ViewChild(PlaceholderDirective, { static: false })
   alertHost: PlaceholderDirective;

   private closeSub: Subscription;

   constructor(
      private authService: AuthService,
      private router: Router,
      private componentFactoryResolver: ComponentFactoryResolver
   ) {}
   onSwitchMode() {
      this.isLoginMode = !this.isLoginMode;
   }

   handleSetClose() {
      this.error = null;
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

            this.router.navigate(['/recipes']);
         },
         (errorMessage) => {
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
         }
      );
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
   }
}
