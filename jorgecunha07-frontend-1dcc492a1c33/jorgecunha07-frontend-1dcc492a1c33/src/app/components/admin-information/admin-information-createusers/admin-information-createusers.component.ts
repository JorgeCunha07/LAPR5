import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";
import IRoleDTO from "../../../dto/IRoleDTO";
import {IUserDTO} from "../../../dto/IUserDTO";
import {IUser_Model} from "../../../models/IUser_Model";

@Component({
  selector: 'app-admin-information-createusers',
  templateUrl: './admin-information-createusers.component.html',
  styleUrls: ['./admin-information-createusers.component.scss']
})
export class AdminInformationCreateusersComponent implements OnInit {
  listRoles: Array<IRoleDTO> = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  private loadRoles(): void {
    this.authService.getRolesAvailable().subscribe({
      next: (data) => this.listRoles = data,
      error: (error) => console.error('Failed to load roles', error)
    });
  }
  userDTO: IUser_Model = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    userNif: "",
    userNumber: "",
  };

  successMessage: string = '';
  errorMessage: string = '';

  goBack(){
    this.router.navigate(['AdminInformation']);
  }

  showNifAndNumber: boolean = false;

  createUser() {
    if (!this.showNifAndNumber) {
      this.userDTO.userNif = null;
      this.userDTO.userNumber = null;
    }

    this.authService.signUp(this.userDTO).subscribe(
      response => {
        this.successMessage = 'User created successfully!';
        this.resetFormAfterDelay();
      },
      error => {
        console.error('Error object:', error);
        this.errorMessage = `Error creating User: ${error.error || 'An unexpected error occurred'}`;
        this.resetFormAfterDelay();
      }
    );
  }

  private resetFormAfterDelay() {
    setTimeout(() => {
      this.userDTO = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        userNif: "",
        userNumber: "",
      };
      this.successMessage = '';
      this.errorMessage = '';
    }, 5000); // Reset after 5 seconds
  }


}
