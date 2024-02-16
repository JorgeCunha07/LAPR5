import { Component } from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-robot-type-page-selection',
  templateUrl: './robot-type-page-selection.component.html',
  styleUrls: ['./robot-type-page-selection.component.scss']
})
export class RobotTypePageSelectionComponent {

  constructor(private authService: AuthService, private router: Router) {}

  navigateToPage(pageNumber: number): void {
    switch (pageNumber) {
      case 1:
        this.router.navigate(['fleet/robot-types/create']);
        break;
      case 2:
        this.router.navigate(['fleet']);
        break;
      default:
        // Handle unknown page number or show error
        break;
    }
  }
}


