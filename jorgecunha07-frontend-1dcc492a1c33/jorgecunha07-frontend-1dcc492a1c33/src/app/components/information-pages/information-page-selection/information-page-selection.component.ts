import { Component } from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-information-page-selection',
  templateUrl: './information-page-selection.component.html',
  styleUrls: ['./information-page-selection.component.scss']
})
export class InformationPageSelectionComponent {

  constructor(private authService: AuthService, private router: Router) {}


  navigateToPage(pageNumber: number): void {
    switch (pageNumber) {
      case 1:
        this.router.navigate(['information/aboutus']);
        break;
      case 2:
        this.router.navigate(['information/rgpd']);
        break;
      case 3:
        this.router.navigate(['information/privacypolicy']);
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
