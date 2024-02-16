import { Component } from '@angular/core';
import { AuthService } from "../../../IService/services/auth.service";
import { PassagewayService } from "../../../IService/services/passageway.service";
import PassagewayDTO from "../../../dto/PassagewayDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-passageway-page-create-passageway',
  templateUrl: './passageway-page-create-passageway.component.html',
  styleUrls: ['./passageway-page-create-passageway.component.scss']
})
export class PassagewayPageCreateComponent {
  passageway: PassagewayDTO = {
    buildingACode: '',
    buildingBCode: '',
    floorA: 0,
    floorB: 0,
    locationA: {
      x: 0,
      y: 0
    },
    locationB: {
      x: 0,
      y: 0
    }
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private passagewayService: PassagewayService,   private router: Router) {}

  createPassageway() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.passageway.buildingACode || !this.passageway.buildingBCode || !this.passageway.floorA || !this.passageway.floorB) {
      this.errorMessage = 'All fields are required!';
      return;
    }

    this.passagewayService.createPassageway(this.passageway).subscribe(
      (response) => {
        this.successMessage = 'Passageway created successfully!';
      },
      (error) => {
        this.errorMessage = 'Error creating passageway: ' + error.message;
      }
    );
  }
  goBack(){
    this.router.navigate(['gestaodocampus/passageways']);
  };
}
