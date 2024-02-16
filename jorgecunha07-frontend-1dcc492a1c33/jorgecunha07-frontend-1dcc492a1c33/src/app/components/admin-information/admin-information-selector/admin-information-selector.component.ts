import { Component } from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-information-selector',
  templateUrl: './admin-information-selector.component.html',
  styleUrls: ['./admin-information-selector.component.scss']
})
export class AdminInformationSelectorComponent {
  constructor(private authService: AuthService, private router: Router) {}


  navigateToPage(pageNumber: number): void {
    switch (pageNumber) {
      case 1:
        this.router.navigate(['AdminInformation/CreateUsers']);
        break;
      case 2:
        this.router.navigate(['AdminInformation/ApproveUsers']);
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
