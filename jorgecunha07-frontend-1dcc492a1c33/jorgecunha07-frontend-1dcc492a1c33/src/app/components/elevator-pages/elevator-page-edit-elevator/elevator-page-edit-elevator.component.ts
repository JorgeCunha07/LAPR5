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
  selector: 'app-elevator-page-edit-elevator',
  templateUrl: './elevator-page-edit-elevator.component.html',
  styleUrls: ['./elevator-page-edit-elevator.component.scss']
})
export class ElevatorPageEditElevatorComponent {
  selectedBuilding: string = '';
  selectedElevator: string = '';
  buildings: BuildingDTO[] = [];
  elevators: ElevatorDTO[] = [];
  selectedFloors: string[] = [];
  floors: FloorDTO[] = [];
  elevatorLocationX: number = 0;
  elevatorLocationY: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

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
    this.elevatorService.getElevatorsByBuilding(this.selectedBuilding).subscribe(elevators => {
      this.elevators = elevators;
    });
  }

  onElevatorSelected() {

    this.floorService.getFloorsByBuilding(this.selectedBuilding).subscribe(floors => {
      this.floors = floors;

      this.selectedFloors = this.floors.map(floor => floor.floorNumber.toString());
    });
  }

  updateElevator(){
    const elevator:ElevatorDTO= {
      buildingFinderId: this.selectedBuilding,
      floors: Object.keys(this.selectedFloors),
      location: undefined
    }
    this.elevatorService.updateElevator(elevator).subscribe(
      response => {
        this.successMessage = 'Elevator updated successfully!';
      },
      error => {
        this.errorMessage = 'Error updating elevator: ' + error.error;
      }
    );
  }

  goBack(){
    this.router.navigate(['gestaodocampus/elevators']);
  }
}
