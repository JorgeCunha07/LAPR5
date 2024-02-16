import { Component } from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-building-page-selection',
  templateUrl: './passageway-page-selection.component.html',
  styleUrls: ['./passageway-page-selection.component.scss']
})
export class PassagewayPageSelectionComponent {

  constructor(private authService: AuthService, private router: Router) {}

  navigateToPage(pageNumber: number): void {
    switch (pageNumber) {
      case 1:
        this.router.navigate(['gestaodocampus/passageways/createPassageway']);
        break;
      case 2:
        this.router.navigate(['gestaodocampus/passageways/editPassageway']);
        break;
      case 3:
        this.router.navigate(['gestaodocampus/passageways/getAllPassagewaysBetweenBuildings']);
        break;
      case 4:
        this.router.navigate(['gestaodocampus/passageways/getFloorsFromBuildingWithPassageway']);
        break;
      case 5:
        this.router.navigate(['gestaodocampus']);
        break;
      default:
        // Handle unknown page number or show error
        break;
    }
  }
}


