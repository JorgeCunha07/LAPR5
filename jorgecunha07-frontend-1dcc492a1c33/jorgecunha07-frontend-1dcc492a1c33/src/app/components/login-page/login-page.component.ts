import { Component } from '@angular/core';
import { AuthService } from '../../IService/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  showError = false;
  model: any = {};
  showErrorPopup: boolean = false;
  errorMessage: string = '';


  constructor(private authService: AuthService, private router: Router) {}

  clearError() {
    this.errorMessage = "";
  }
  closePopup() {
    this.showErrorPopup = false;
  }

  onSubmit() {
    this.authService.login(this.model).subscribe(
      success => {
        if(success){
          this.router.navigate(['modules']);
        } else {
          this.showError = true;
        }

        // Redirect to another page or do something else
      },
      error => {
        // Trigger the error pop-up
        this.errorMessage = 'Invalid credentials, please try again.';
        this.showErrorPopup = true;
      }
    );
  }
}
