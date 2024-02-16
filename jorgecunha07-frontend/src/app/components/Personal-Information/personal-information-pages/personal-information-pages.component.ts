import { Component } from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-personal-information-pages',
  templateUrl: './personal-information-pages.component.html',
  styleUrls: ['./personal-information-pages.component.scss']
})
export class PersonalInformationPagesComponent {


  constructor(private authService: AuthService, private router: Router) {}


  navigateToPage(pageNumber: number): void {
    switch (pageNumber) {
      case 1:
        this.router.navigate(['PersonalInformation/modifyPersonalData']);
        break;
      case 2:
        this.router.navigate(['PersonalInformation/InformationCopy']);
        break;
      case 3:
        this.router.navigate(['PersonalInformation/deleteAccount']);
        break;
      case 4:
        this.router.navigate(['modules']);
        break;
      default:
        // Handle unknown page number or show error
        break;
    }
  }
}
