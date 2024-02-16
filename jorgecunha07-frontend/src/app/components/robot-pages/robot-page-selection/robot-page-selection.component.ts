import { Component } from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-robot-page-selection',
  templateUrl: './robot-page-selection.component.html',
  styleUrls: ['./robot-page-selection.component.scss']
})
export class RobotPageSelectionComponent {

  constructor(private authService: AuthService, private router: Router) {}

  navigateToPage(pageNumber: number): void {
    switch (pageNumber) {
      case 1:
        this.router.navigate(['fleet/robot/create']);
        break;
      case 2:
        this.router.navigate(['fleet/robot/manage']);
        break;
      case 3:
        this.router.navigate(['fleet']);
        break;
      default:
        break;
    }
  }
}


