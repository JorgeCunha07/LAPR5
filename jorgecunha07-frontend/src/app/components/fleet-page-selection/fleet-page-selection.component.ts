import { Component } from '@angular/core';
import {AuthService} from "../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fleet-page-selection',
  templateUrl: './fleet-page-selection.component.html',
  styleUrls: ['./fleet-page-selection.component.scss']
})
export class FleetPageSelectionComponent {
  // Define paths as strings
  robotTypePath: string = 'fleet/robot-types';
  robotPath: string = 'fleet/robot';
  backPath: string = 'modules';

  constructor(private authService: AuthService, private router: Router) {}


  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
