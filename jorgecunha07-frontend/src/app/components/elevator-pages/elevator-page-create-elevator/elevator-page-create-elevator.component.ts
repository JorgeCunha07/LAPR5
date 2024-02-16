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
  selector: 'app-elevator-page-create-elevator',
  templateUrl: './elevator-page-create-elevator.component.html',
  styleUrls: ['./elevator-page-create-elevator.component.scss']
})
export class ElevatorPageCreateElevatorComponent implements OnInit {
  buildings: BuildingDTO[] = [];
  selectedBuilding: string = '';
  selectedElevator: ElevatorDTO[]=[];
  elevators: ElevatorDTO[]=[];
  floors: FloorDTO[] = [];
  selectedFloors: string[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  elevatorLocationX: number = 0;
  elevatorLocationY: number = 0;

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
      this.floorService.getFloorsByBuilding(this.selectedBuilding).subscribe(floors => {
        this.floors = floors;
      });
    }
  }

  goBack(){
    this.router.navigate(['gestaodocampus/elevators']);
  }

  createElevator() {
      const elevator:ElevatorDTO= {
        buildingFinderId: this.selectedBuilding,
        floors: Object.keys(this.selectedFloors),
        location:{x:this.elevatorLocationX, y:this.elevatorLocationY}
      };
    this.elevatorService.createElevator(elevator).subscribe(
      response => {
        this.successMessage = 'Elevator created successfully!';
      },
      error => {
        this.errorMessage = 'Error creating elevator: ' + error.error;
      }
    );
  }
}
