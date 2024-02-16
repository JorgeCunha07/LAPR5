import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../IService/services/auth.service";
import { BuildingService } from "../../../IService/services/building.service";
import { FloorService } from "../../../IService/services/floor.service";
import { ElevatorService } from "../../../IService/services/elevator.service";
import BuildingDTO from "../../../dto/BuildingDTO";
import ElevatorDTO from '../../../dto/ElevatorDTO';
import FloorDTO from "../../../dto/IFloorDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-elevator-page-get-elevator',
  templateUrl: './elevator-page-get-elevator.component.html',
  styleUrls: ['./elevator-page-get-elevator.component.scss']
})
export class ElevatorPageGetElevatorComponent {
  buildings: BuildingDTO[] = [];
  selectedBuilding: string = '';
  floors: FloorDTO[] = [];
  elevatorLocationX: number = 0;
  elevatorLocationY: number = 0;
  elevators: ElevatorDTO[]=[];

  constructor(
    private authService: AuthService,
    private buildingService: BuildingService,
    private elevatorService: ElevatorService,
    private floorService: FloorService,
    private router: Router
  ) {}
  ngOnInit() {
    this.buildingService.getList().subscribe(buildings => {
      this.buildings = buildings;
    });
  }
  onBuildingSelected() {
    if (this.selectedBuilding) {
      this.elevatorService.getElevatorsByBuilding(this.selectedBuilding).subscribe(elevators => {
        this.elevators = elevators.map((elevator: ElevatorDTO) => ({
          location: elevator.location,
          floors: elevator.floors
        }));
      });
    }
  }
  goBack(){
    this.router.navigate(['gestaodocampus/elevators']);
  }

}
