import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../IService/services/auth.service';
import { Router } from '@angular/router';
import { IUser_Model } from '../../../models/IUser_Model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal-information-modify',
  templateUrl: './personal-information-modify.component.html',
  styleUrls: ['./personal-information-modify.component.scss']
})
export class PersonalInformationModifyComponent implements OnInit, OnDestroy {
  alteredPassword: string = "false";
  personalInfo: IUser_Model = {
    firstName: "",
    lastName: "",
    email: "",
    password: "teste",
    role: "",
    userNif: "",
    userNumber: "",
  };

  private userInfoSubscription!: Subscription;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userInfoSubscription = this.authService.userInfo.subscribe(userInfo => {
      if (userInfo && userInfo.email) {
        this.loadPersonalInfo(userInfo.email);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }

  onPasswordCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.alteredPassword = checkbox.checked ? 'true' : 'false';
  }


  private loadPersonalInfo(email: string): void {
    this.authService.getUserInfo(email).subscribe({
      next: (data) => this.personalInfo = data,
      error: (error) => console.error('Failed to load User Information', error)
    });
  }

  goBack(): void {
    this.router.navigate(['PersonalInformation']);
  }

  updateUserInfo(): void {
    if (this.alteredPassword === "false"){
      this.personalInfo.password = "teste";
    }

    this.authService.updateUserInfo(this.alteredPassword, this.personalInfo).subscribe({
      next: (data) => {
        this.successMessage = 'Information updated successfully!';
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Failed to update the User Information', error);
        this.errorMessage = 'Failed to update the User Information. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
