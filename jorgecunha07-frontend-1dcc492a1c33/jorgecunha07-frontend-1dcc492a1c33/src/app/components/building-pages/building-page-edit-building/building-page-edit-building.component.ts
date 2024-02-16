import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingService } from "../../../IService/services/building.service";
import BuildingDTO from "../../../dto/BuildingDTO";
import { AuthService } from "../../../IService/services/auth.service";

@Component({
  selector: 'app-building-page-edit-building',
  templateUrl: './building-page-edit-building.component.html',
  styleUrls: ['./building-page-edit-building.component.scss']
})
export class BuildingPageEditBuildingComponent implements OnInit {
  listBuildings: BuildingDTO[] = [];
  building: BuildingDTO = {
    buildingCode: '',
    buildingName: '',
    buildingDescription: '',
    buildingSize: {
      width: 0,
      length: 0,
    },
  };
  successMessage?: string;
  errorMessage?: string;

  constructor(
    private authService: AuthService,
    private buildingService: BuildingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  goBack(){
    this.router.navigate(['gestaodocampus/buildings']);
  }
  ngOnInit(): void {
    this.loadBuildings();
  }

  private loadBuildings(): void {
    this.buildingService.getList().subscribe({
      next: (data) => this.listBuildings = data,
      error: (error) => console.error('Failed to load buildings', error)
    });
  }

  onSelectBuilding(code: string): void {
    this.getBuilding(code);
  }

  private getBuilding(code: string): void {
    this.buildingService.getBuildingByCode(code).subscribe({
      next: (data) => {
        this.building = data;
      },
      error: (error) => {
        this.errorMessage = `Error fetching building: ${error.message}`;
        console.error(error);
      }
    });
  }

  updateBuilding(): void {
    if (this.building.buildingCode) {
      this.buildingService.updateBuilding(this.building).subscribe({
        next: () => {
          this.successMessage = 'Building updated successfully';
        },
        error: (error) => {
          this.errorMessage = 'Error updating building: ' + error.error.errors.message;
          console.error('Error:', error);
        }
      });
    } else {
      this.errorMessage = 'No building code selected';
    }
  }
}
