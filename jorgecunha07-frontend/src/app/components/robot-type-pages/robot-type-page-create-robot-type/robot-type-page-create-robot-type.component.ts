import { Component } from '@angular/core';
import { AuthService } from "../../../IService/services/auth.service";
import { RobotTypeService } from 'src/app/IService/services/robotType.service';
import RobotTypeDTO from 'src/app/dto/RobotTypeDTO';
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-robot-type-page-create-robot-type',
  templateUrl: './robot-type-page-create-robot-type.component.html',
  styleUrls: ['./robot-type-page-create-robot-type.component.scss']
})
export class RobotTypePageCreateRobotTypeComponent {
  robotType: RobotTypeDTO = {
    robotTypeName: '',
    robotBrand: '',
    robotModel: '',
    supportedTaskTypes: [],
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private robotTypeService: RobotTypeService,   private router: Router) {}

  availableTaskTypes: { display: string; value: string; selected: boolean }[] = [
    { display: 'Transport Task', value: 'TransportTask', selected: false },
    { display: 'Surveillance Task', value: 'SurveillanceTask', selected: false },
  ];

  createRobotType() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.robotType.robotTypeName || !this.robotType.robotBrand || !this.robotType.robotModel) {
      this.errorMessage = 'You missed a required field!';
      return;
    }

    this.robotTypeService
      .createRobotType(this.robotType)
      .pipe(
        catchError(error => {
          let errorMessage;

          if (error.error && error.error.errors && error.error.errors.message) {
            // Case 1: Error message is nested under errors.message
            errorMessage = 'Error creating robot type: ' + error.error.errors.message;
          } else if (error.error && typeof error.error === 'string') {
            // Case 2: Error message is directly in the response body
            errorMessage = 'Error creating robot type: ' + error.error;
          } else {
            errorMessage = 'An unknown error occurred.';
          }

          this.errorMessage = errorMessage;

          return throwError(errorMessage);
        }),
      )
      .subscribe(response => {
        this.successMessage = 'Robot type created successfully!';
      });
  }

  toggleTaskType(taskType: any) {
    // Initialize supportedTaskTypes if not already defined
    this.robotType.supportedTaskTypes = this.robotType.supportedTaskTypes || [];

    if (taskType.selected) {
      this.robotType.supportedTaskTypes.push(taskType.value);
    } else {
      const index = this.robotType.supportedTaskTypes.indexOf(taskType.value);
      if (index !== -1) {
        this.robotType.supportedTaskTypes.splice(index, 1);
      }
    }
  }

  goBack(){
    this.router.navigate(['fleet/robot-types']);
  };
}
