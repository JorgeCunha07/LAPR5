import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../IService/services/auth.service";
import { Router } from "@angular/router";
import { IUserDTO } from "../../../dto/IUserDTO";
import {IUser_Model} from "../../../models/IUser_Model";

@Component({
  selector: 'app-admin-information-approveutentes',
  templateUrl: './admin-information-approveutentes.component.html',
  styleUrls: ['./admin-information-approveutentes.component.scss']
})
export class AdminInformationApproveutentesComponent implements OnInit {
  listOfUsers: Array<IUser_Model> = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  private loadRoles(): void {
    this.authService.getAllUserRequests().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listOfUsers = data;
        } else {
          this.handleEmptyResponse();
        }
      },
      error: (error) => this.handleError(error)
    });
  }

  private handleEmptyResponse(): void {
    console.log('Received an empty response, possibly due to an error.');
  }

  approveUser(email: string): void {
    this.authService.approveUserRequest(email, null).subscribe({
      next: () => this.successMessage = 'User created successfully!',
      error: (error) => this.handleError(error)
    });
  }

  denyingUser(email: string): void {
    this.authService.deleteUserRequest(email).subscribe({
      next: () => this.successMessage = 'User request denied successfully!',
      error: (error) => this.handleError(error)
    });
  }

  goBack(): void {
    this.router.navigate(['AdminInformation']);
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    this.errorMessage = `Error: ${error.message || 'Unknown error'}`;
  }
}
