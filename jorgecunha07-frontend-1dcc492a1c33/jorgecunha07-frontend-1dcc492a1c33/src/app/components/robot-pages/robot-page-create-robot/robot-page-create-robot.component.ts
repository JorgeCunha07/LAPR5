import { Component } from '@angular/core';
import { AuthService } from '../../../IService/services/auth.service';
import RobotDTO from 'src/app/dto/RobotDTO';
import { RobotService } from 'src/app/IService/services/robot.service';
import { catchError, throwError } from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-robot-page-create-robot',
  templateUrl: './robot-page-create-robot.component.html',
  styleUrls: ['./robot-page-create-robot.component.scss'],
})
export class RobotPageCreateRobotComponent {
  robot: RobotDTO = {
    robotCode: '',
    robotDescription: '',
    robotNickname: '',
    robotSerialNumber: '',
    robotTypeName: '',
    enabled: true,
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private robotService: RobotService, private router: Router) {}

  createRobot() {
    this.successMessage = '';
    this.errorMessage = '';

    if (
      !this.robot.robotCode ||
      !this.robot.robotDescription ||
      !this.robot.robotNickname ||
      !this.robot.robotSerialNumber ||
      !this.robot.robotTypeName
    ) {
      this.errorMessage = 'All fields are required!';
      return;
    }

    this.robotService
      .createRobot(this.robot)
      .pipe(
        catchError(error => {
          let errorMessage;

          if (error.error && error.error.errors && error.error.errors.message) {
            // Case 1: Error message is nested under errors.message
            errorMessage = 'Error creating robot: ' + error.error.errors.message;
          } else if (error.error && typeof error.error === 'string') {
            // Case 2: Error message is directly in the response body
            errorMessage = 'Error creating robot: ' + error.error;
          } else {
            errorMessage = 'An unknown error occurred.';
          }

          this.errorMessage = errorMessage;

          return throwError(errorMessage);
        }),
      )
      .subscribe(response => {
        this.successMessage = 'Robot created successfully!';
      });
  }

  goBack(){
    this.router.navigate(['fleet/robot']);
  };
}
