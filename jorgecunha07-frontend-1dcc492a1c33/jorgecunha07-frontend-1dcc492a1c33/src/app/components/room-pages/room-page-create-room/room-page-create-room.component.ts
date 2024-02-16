import { Component, OnInit } from '@angular/core';
import { BuildingService } from "../../../IService/services/building.service";
import { FloorService } from "../../../IService/services/floor.service";
import { RoomService } from "../../../IService/services/room.service";
import RoomDTO from "../../../dto/RoomDTO";
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";
import BuildingDTO from "../../../dto/BuildingDTO";
import FloorDTO from "../../../dto/IFloorDTO";

@Component({
  selector: 'app-room-page-create-room',
  templateUrl: './room-page-create-room.component.html',
  styleUrls: ['./room-page-create-room.component.scss']
})
export class RoomPageCreateRoomComponent implements OnInit{
  buildings: BuildingDTO[] = [];
  selectedBuilding: string = '';
  floors: FloorDTO[] = [];
  selectedFloor: number = 0;
  rooms: RoomDTO[] = [];
  name: string='';
  type: string='';
  description: string='';
  buildingFinderId: string='';
  floorNumber: number=0;
  roomLocationX: number = 0;
  roomLocationY: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private buildingService: BuildingService,
    private floorService: FloorService,
    private roomService: RoomService,
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
  createRoom() {
    const room: RoomDTO= {
      name: this.name,
      type: this.type,
      description: this.description,
      buildingFinderId: this.selectedBuilding,
      floorNumber: this.selectedFloor,
      location: {
        x: this.roomLocationX,
        y: this.roomLocationY,
      },
    }
    this.roomService.createRoom(room).subscribe(
      response => {
        this.successMessage = 'Room ' + this.name + ' created successfully!';
      },
      error => {
        this.errorMessage = 'Error creating room: ' + error.error;
      }
    );
  }

  goBack(){
    this.router.navigate(['gestaodocampus/rooms']);
  }
}
