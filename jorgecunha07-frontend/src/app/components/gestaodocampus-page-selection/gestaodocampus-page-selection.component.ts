import { Component } from '@angular/core';
import {AuthService} from "../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gestaodocampus-page-selection',
  templateUrl: './gestaodocampus-page-selection.component.html',
  styleUrls: ['./gestaodocampus-page-selection.component.scss']
})
export class GestaodocampusPageSelectionComponent {
  // Define paths as strings
  buildingPath: string = 'gestaodocampus/buildings';
  floorPath: string = 'gestaodocampus/floors';
  elevatorPath: string = 'gestaodocampus/elevators';
  roomPath: string = 'gestaodocampus/rooms';
  passagewayPath: string = 'gestaodocampus/passageways';
  modules:string = 'modules';

  constructor(private authService: AuthService, private router: Router) {}


  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
