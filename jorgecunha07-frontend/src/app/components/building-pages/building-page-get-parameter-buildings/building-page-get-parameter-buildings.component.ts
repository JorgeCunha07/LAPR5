import { Component } from '@angular/core';
import { AuthService } from "../../../IService/services/auth.service";
import { BuildingService } from "../../../IService/services/building.service";
import Building_FloorsDTO from "../../../dto/Building_FloorsDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-building-page-get-parameter-buildings',
  templateUrl: './building-page-get-parameter-buildings.component.html',
  styleUrls: ['./building-page-get-parameter-buildings.component.scss']
})
export class BuildingPageGetParameterBuildingsComponent {

  results: Building_FloorsDTO[] = [];
  minFloors: number = 0;
  maxFloors: number = 0;


  constructor(private authService: AuthService, private buildingService: BuildingService,  private router: Router) {}

  goBack(){
    this.router.navigate(['gestaodocampus/buildings']);
  }

  getBuildingsWithParameters() {
    if (this.minFloors >= 0 && this.maxFloors >= this.minFloors) {
      this.buildingService.getListByParameters(this.minFloors, this.maxFloors)
        .subscribe(
          buildings => {
            this.results = buildings.sort((a, b) => a.floorsNumber - b.floorsNumber);
          },
          error => {
            console.error(error.error.errors.message);
          }
        );
    } else {
      console.error('Invalid floor parameters');
    }
  }

}
