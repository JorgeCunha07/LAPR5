import { Component } from '@angular/core';
import { AuthService } from "../../../IService/services/auth.service";
import { BuildingService } from "../../../IService/services/building.service";
import BuildingDTO from "../../../dto/BuildingDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-building-page-create-building',
  templateUrl: './building-page-create-building.component.html',
  styleUrls: ['./building-page-create-building.component.scss']
})
export class BuildingPageCreateBuildingComponent {
  building: BuildingDTO = {
    buildingCode: '',
    buildingName: '',
    buildingDescription: '',
    buildingSize: {
      width: 0,
      length: 0
    }
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private buildingService: BuildingService,  private router: Router) {}

  goBack(){
    this.router.navigate(['gestaodocampus/buildings']);
  }

  createBuilding() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.building.buildingCode || !this.building.buildingName || !this.building.buildingSize.width || !this.building.buildingSize.length) {
      this.errorMessage = 'All fields are required!';
      return;
    }

    this.buildingService.createBuilding(this.building).subscribe(
      (response) => {
        this.successMessage = 'Building created successfully!';
      },
      (error) => {
        this.errorMessage = 'Error creating building: ' + error.error.errors.message;
      }
    );
  }
}
