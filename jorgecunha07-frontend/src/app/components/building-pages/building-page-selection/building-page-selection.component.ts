import { Component } from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-building-page-selection',
  templateUrl: './building-page-selection.component.html',
  styleUrls: ['./building-page-selection.component.scss']
})
export class BuildingPageSelectionComponent {

  constructor(private authService: AuthService, private router: Router) {}

  navigateToPage(pageNumber: number): void {
    switch (pageNumber) {
      case 1:
        this.router.navigate(['gestaodocampus/buildings/CreateBuilding']);
        break;
      case 2:
        this.router.navigate(['gestaodocampus/buildings/EditBuilding']);
        break;
      case 3:
        this.router.navigate(['gestaodocampus/buildings/FindAllBuildings']);
        break;
      case 4:
        this.router.navigate(['gestaodocampus/buildings/FindAllBuildingsByParameter']);
        break;
      case 5:
        this.router.navigate(['gestaodocampus']);
        break;
      default:
        break;
    }
  }
}


