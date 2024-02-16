import { Component } from '@angular/core';
import { PassagewayService } from "../../../IService/services/passageway.service";
import PassagewayDTO from "../../../dto/PassagewayDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-passageway-page-get-floors-from-building',
  templateUrl: './passageway-page-get-floors-from-building.component.html',
  styleUrls: ['./passageway-page-get-floors-from-building.component.scss']
})
export class PassagewayPageGetFloorsFromBuildingWithPassagewayComponent {
  buildingCode: string = '';
  results: PassagewayDTO[] = [];
  errorMessage: string = '';

  constructor(private passagewayService: PassagewayService, private router: Router) {}

  getFloorsFromBuildingWithPassageway() {
    this.passagewayService.getFloorsFromBuildingWithPassageway(this.buildingCode).subscribe(
      (data: PassagewayDTO[]) => {
        this.results = data;
      },
      error => {
        console.error('Failed to load floors', error);
        this.errorMessage = 'Failed to load floors';
      }
    );
  }
  goBack(){
    this.router.navigate(['gestaodocampus/passageways']);
  };
}
