import { Component } from '@angular/core';
import { PassagewayService } from "../../../IService/services/passageway.service";
import PassagewayDTO from "../../../dto/PassagewayDTO";
import { Router } from '@angular/router';

@Component({
  selector: 'app-passageway-page-get-all-passageways',
  templateUrl: './passageway-page-get-all-passageways.component.html',
  styleUrls: ['./passageway-page-get-all-passageways.component.scss']
})
export class PassagewayPageGetPassagewaysComponent {
  buildingACode: string = '';
  buildingBCode: string = '';
  results: PassagewayDTO[] = [];
  errorMessage: string = '';

  constructor(private passagewayService: PassagewayService,   private router: Router) {}

  getAllPassagewaysBetweenBuildings() {
    this.passagewayService.getAllPassagewaysBetweenBuildings(this.buildingACode, this.buildingBCode).subscribe(
      (data: PassagewayDTO[]) => {
        this.results = data;
      },
      error => {
        console.error('Failed to load passageways', error);
        this.errorMessage = 'Failed to load passageways';
      }
    );
  }

  goBack(){
    this.router.navigate(['gestaodocampus/passageways']);
  };
}
