import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../IService/services/auth.service';
import { Router } from '@angular/router';
import { IUser_Model } from '../../../models/IUser_Model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal-information-delete',
  templateUrl: './personal-information-delete.component.html',
  styleUrls: ['./personal-information-delete.component.scss']
})
export class PersonalInformationDeleteComponent implements OnInit, OnDestroy {
  personalInfo: IUser_Model = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    userNif: "",
    userNumber: "",
  };
  private userInfoSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userInfoSubscription = this.authService.userInfo.subscribe(userInfo => {
      if (userInfo && userInfo.email) {
        this.loadPersonalInfo(userInfo.email);
      }
    });
  }

  private loadPersonalInfo(email: string): void {
    this.authService.getUserInfo(email).subscribe({
      next: (data) => this.personalInfo = data,
      error: (error) => console.error('Failed to load User Information', error)
    });
  }

  delete(): void {
    this.authService.deleteUser(this.personalInfo.email).subscribe({
      next: () => this.finishedAccount(),
      error: (error) => console.error('Failed to delete the User Information', error)
    });
  }

  finishedAccount(): void {
    this.router.navigate(['']);
  }

  goBack(){
    this.router.navigate(['PersonalInformation']);
  }

  ngOnDestroy(): void {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }
}
