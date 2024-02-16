import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";
import {Taskservice} from "../../../IService/services/taskservice";
import SurveillanceTaskDTO from "../../../dto/SurveillanceTaskDTO";
import { TaskStatusEnum } from 'src/app/Constants/TastStatusEnum';
import {Subscription} from "rxjs";
import SurveillanceTask_Model from "../../../models/SurveillanceTask_Model";
import BuildingDTO from "../../../dto/BuildingDTO";
import IFloorDTO from "../../../dto/IFloorDTO";
import {BuildingService} from "../../../IService/services/building.service";
import {FloorService} from "../../../IService/services/floor.service";

@Component({
  selector: 'app-task-page-create-surveillance-task',
  templateUrl: './task-page-create-surveillance-task.component.html',
  styleUrls: ['./task-page-create-surveillance-task.component.scss']
})
export class TaskPageCreateSurveillanceTaskComponent implements OnInit, OnDestroy{
  task: SurveillanceTask_Model = {
    TaskState: TaskStatusEnum.Submitted,
    Description: "",
    FromLocation: { Building: '', Room: 0, X: 0, Y: 0 },
    ToLocation: { Building: '', Room: 0, X: 0, Y: 0 },
    ContactInfo: "",
    User: "",
    RobotId: "",
    RobotType: "",
    name:"",
  };
  private userInfoSubscription!: Subscription;
  isReadOnly = true;
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

  onFromBuildingSelected() {
    this.floorService.getFloorsByBuilding(this.selectedFromBuilding).subscribe(floors => {
      this.fromFloors = floors;
      this.task.FromLocation.Building = this.selectedFromBuilding; // Update task model
    });
  }

  onToBuildingSelected() {
    this.floorService.getFloorsByBuilding(this.selectedToBuilding).subscribe(floors => {
      this.toFloors = floors;
      this.task.ToLocation.Building = this.selectedToBuilding; // Update task model
    });
  }



  goBack(){
    this.router.navigate(['task']);
  }

  createTransportTask() {
    this.successMessage = '';
    this.errorMessage = '';


    this.taskService.createSurvaillenceTask(this.task).subscribe(
      (response) => {
        this.successMessage = 'Surveillance Task created successfully!';
      },
      (error) => {
        const errorMessage = error?.error || 'An unknown error occurred';
        if (errorMessage.toLowerCase().includes('duplicate task name')) {
          this.errorMessage = errorMessage;
        } else if (errorMessage.toLowerCase().includes('from location and tolocation must have the same building and room')) {
          this.errorMessage = 'From Location and To Location must have the same Building and Room.';
        }
        else if (errorMessage.toLowerCase().includes('contact')) {
          this.errorMessage = 'Error with contact info.';
        }
        else {
          this.errorMessage = 'Error creating Surveillance Task: ' + errorMessage;
        }
      }
    );
  }
}
