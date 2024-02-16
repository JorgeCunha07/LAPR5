import { Component } from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-elevator-page-selection',
  templateUrl: './elevator-page-selection.component.html',
  styleUrls: ['./elevator-page-selection.component.scss']
})
export class ElevatorPageSelectionComponent {

  constructor(private authService: AuthService, private router: Router) {}

  navigateToPage(pageNumber: number): void {
    switch (pageNumber) {
      case 1:
        this.router.navigate(['gestaodocampus/elevators/CreateElevator']);
        break;
      case 2:
        this.router.navigate(['gestaodocampus/elevators/EditElevator']);
        break;
      case 3:
        this.router.navigate(['gestaodocampus/elevators/ElevatorsByBuilding']);
        break;
      case 4:
        this.router.navigate(['gestaodocampus']);
        break;
      default:
        break;
    }
  }
}


