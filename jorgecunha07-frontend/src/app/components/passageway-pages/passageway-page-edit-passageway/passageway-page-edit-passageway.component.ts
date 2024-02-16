import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassagewayService } from "../../../IService/services/passageway.service";
import PassagewayDTO from "../../../dto/PassagewayDTO";
import { AuthService } from "../../../IService/services/auth.service";

@Component({
  selector: 'app-passageway-page-edit-passageway',
  templateUrl: './passageway-page-edit-passageway.component.html',
  styleUrls: ['./passageway-page-edit-passageway.component.scss']
})
export class PassagewayPageEditComponent {
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
  successMessage?: string;
  errorMessage?: string;

  constructor(
    private authService: AuthService,
    private passagewayService: PassagewayService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  updatePassageway() {
    if (this.passageway) {
      this.passagewayService.updatePassageway(this.passageway).subscribe({
        next: (data) => {
          console.log(data);
          this.successMessage = 'Passageway updated successfully';
        },
        error: (error) => {
          console.error('Error:', error);

          // The response should be in error.error if the backend sends a JSON object
          if (error.error) {
            this.errorMessage = error.error;
          } else if (error.message) {
            // Fallback in case there's no error message in the expected field
            this.errorMessage = error.message;
          } else {
            // Generic fallback error message
            this.errorMessage = 'An unknown error occurred.';
          }
        }
      });
    } else {
      this.errorMessage = 'No passageway information to update';
    }
  }

  goBack(){
    this.router.navigate(['gestaodocampus/passageways']);
  };
}
