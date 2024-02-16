import { Component } from '@angular/core';
import { BuildingService } from "../../../IService/services/building.service";
import BuildingDTO from "../../../dto/BuildingDTO";
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './building-page-get-All-Buildings.component.html',
  styleUrls: ['./building-page-get-All-Buildings.component.scss']
})
export class BuildingPageGetAllBuildingsComponent {
  results: BuildingDTO[] = [];

  constructor(private authService: AuthService, private roboService: BuildingService,  private router: Router) {}

  goBack(){
    this.router.navigate(['gestaodocampus/buildings']);
  }
  onSubmit() {
    this.roboService.getList().subscribe(
      (data: BuildingDTO[]) => {
        this.results = data.sort((a, b) => a.buildingName.localeCompare(b.buildingName));
      },
      error => {
        console.error('Failed to load buildings', error.error.errors.message);
      }
    );
  }
}
