import {Component, OnInit} from '@angular/core';
import FloorDTO from '../../../dto/IFloorDTO';
import { AuthService } from "../../../IService/services/auth.service";
import { FloorService } from "../../../IService/services/floor.service";
import {BuildingService} from "../../../IService/services/building.service";
import BuildingDTO from "../../../dto/BuildingDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-floor-page-get-by-building',
  templateUrl: './floor-page-get-by-building.component.html',
  styleUrls: ['./floor-page-get-by-building.component.scss']
})
export class FloorPageGetByBuildingComponent implements OnInit {
  selectedBuilding: string = '';
  floorNumbers: number[] = [];
  buildings: BuildingDTO[] = [];
  floors: FloorDTO[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
              private authService: AuthService,
              private floorService: FloorService,
              private buildingService: BuildingService,
              private router: Router
  ) {}

  ngOnInit() {
    this.buildingService.getList().subscribe(buildings => {
      this.buildings = buildings;
    });
  }

  onBuildingSelected(buildingCode: string) {
    this.selectedBuilding = buildingCode;
    this.floorService.getFloorsByBuilding(buildingCode).subscribe((floors) => {
      this.floorNumbers = floors.map((floors: FloorDTO) => floors.floorNumber);
    });
  }

  goBack(){
    this.router.navigate(['gestaodocampus/floors']);
  }
}
