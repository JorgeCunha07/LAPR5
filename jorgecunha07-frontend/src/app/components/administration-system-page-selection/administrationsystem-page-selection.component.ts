import { Component } from '@angular/core';
import {AuthService} from "../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-administrationsystem-page-selection',
  templateUrl: './administrationsystem-page-selection.component.html',
  styleUrls: ['./administrationsystem-page-selection.component.scss']
})
export class AdministrationsystemPageSelectionComponent {

  constructor(private authService: AuthService, private router: Router) {}

  // Define the paths as properties of the class
  module1Path = '/mbco';
  module2Path = '/recuperacaodedados';



  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
