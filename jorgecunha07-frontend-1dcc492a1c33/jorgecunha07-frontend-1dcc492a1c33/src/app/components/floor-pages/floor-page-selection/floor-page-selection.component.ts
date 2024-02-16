import { Component } from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-floor-page-selection',
  templateUrl: './floor-page-selection.component.html',
  styleUrls: ['./floor-page-selection.component.scss']
})
export class FloorPageSelectionComponent {

  constructor(private authService: AuthService, private router: Router) {}

  navigateToPage(pageNumber: number): void {
    switch (pageNumber) {
      case 1:
        this.router.navigate(['gestaodocampus/floors/CreateFloor']);
        break;
      case 2:
        this.router.navigate(['gestaodocampus/floors/UpdateFloor']);
        break;
      case 3:
        this.router.navigate(['gestaodocampus/floors/UpdateFloorMap']);
        break;
      case 4:
        this.router.navigate(['gestaodocampus/floors/FloorByBuilding']);
        break;
      case 5:
        this.router.navigate(['gestaodocampus']);
        break;
      default:
        break;
    }
  }
}


