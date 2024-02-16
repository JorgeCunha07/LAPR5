import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";
import {IUser_Model} from "../../../models/IUser_Model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-personal-information-copy',
  templateUrl: './personal-information-copy.component.html',
  styleUrls: ['./personal-information-copy.component.scss']
})
export class PersonalInformationCopyComponent implements OnInit , OnDestroy{
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
      if (userInfo) {
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

  ngOnDestroy(): void {
    this.userInfoSubscription.unsubscribe();
  }


  goBack(){
    this.router.navigate(['PersonalInformation']);
  }

  downloadPersonalInfoAsJson() {
    const dataStr = JSON.stringify(this.personalInfo, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'personal-info.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
