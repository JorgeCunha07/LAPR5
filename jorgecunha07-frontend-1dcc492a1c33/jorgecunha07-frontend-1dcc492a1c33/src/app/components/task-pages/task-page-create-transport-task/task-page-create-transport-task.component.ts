import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";
import {Taskservice} from "../../../IService/services/taskservice";
import TransportTaskDTO from "../../../dto/TransportTaskDTO";
import {Subscription} from "rxjs";
import TransportTask_Model from "../../../models/TransportTask_Model";
import BuildingDTO from "../../../dto/BuildingDTO";
import IFloorDTO from "../../../dto/IFloorDTO";
import {BuildingService} from "../../../IService/services/building.service";
import {FloorService} from "../../../IService/services/floor.service";

@Component({
  selector: 'app-task-page-create-transport-task',
  templateUrl: './task-page-create-transport-task.component.html',
  styleUrls: ['./task-page-create-transport-task.component.scss']
})
export class TaskPageCreateTransporTaskComponent implements OnInit, OnDestroy{
  task: TransportTask_Model = {
    // Initialize with default values or fetch from a service
    Description: '',
    FromLocation: { Building: '', Room: 0, X: 0, Y: 0 },
    ToLocation: { Building: '', Room: 0, X: 0, Y: 0 },
    ContactStart: '',
    ContactEnd: '',
    User: '',
    RobotId: '',
    RobotType: '',
    name:"",
  };
  fromBuildings: BuildingDTO[] = [];
  toBuildings: BuildingDTO[] = [];
  selectedFromBuilding: string = '';
  selectedToBuilding: string = '';
  fromFloors: IFloorDTO[] = [];
  toFloors: IFloorDTO[] = [];
  selectedFromFloor: number = 0;
  selectedToFloor: number = 0;
  successMessage: string = '';
  errorMessage: string = '';
  isReadOnly = true;

  private userInfoSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router, private taskService: Taskservice, private buildingService: BuildingService, private floorService: FloorService) {}

  ngOnInit(): void {
    this.userInfoSubscription = this.authService.userInfo.subscribe(userInfo => {
      if (userInfo && userInfo.email) {
        this.task.User = userInfo.email;
      }
    });
    this.buildingService.getList().subscribe(buildings => {
      this.fromBuildings = buildings;
    });
    this.buildingService.getList().subscribe(buildings => {
      this.toBuildings = buildings;
    });
  }

  ngOnDestroy(): void {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }

// Component Class

  onFromBuildingSelected() {
    this.floorService.getFloorsByBuilding(this.selectedFromBuilding).subscribe(floors => {
      this.fromFloors = floors;
      this.task.FromLocation.Building = this.selectedFromBuilding; // Update the task model
    });
  }

  onToBuildingSelected() {
    this.floorService.getFloorsByBuilding(this.selectedToBuilding).subscribe(floors => {
      this.toFloors = floors;
      this.task.ToLocation.Building = this.selectedToBuilding; // Update the task model
    });
  }


  goBack(){
    this.router.navigate(['task']);
  }

  createTransportTask() {
    this.successMessage = '';
    this.errorMessage = '';
    console.log(this.task);

    this.taskService.createTransportTask(this.task).subscribe(
      (response) => {
        this.successMessage = 'Transport Task created successfully!';
      },
      (error) => {
        const errorMessage = error?.error || 'An unknown error occurred';
        if (errorMessage.toLowerCase().includes('duplicate task name')) {
          this.errorMessage = errorMessage;
        } else if (errorMessage.toLowerCase().includes('contact start')) {
          this.errorMessage = 'Error with the start contact.';
        }
        else if (errorMessage.toLowerCase().includes('contact end')) {
          this.errorMessage = 'Error with the end contact.';
        }
        else {
          this.errorMessage = 'Error creating Transport Task: ' + errorMessage;
        }
      }
    );
  }
}
