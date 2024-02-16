import { Component } from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-room-page-selection',
  templateUrl: './room-page-selection.component.html',
  styleUrls: ['./room-page-selection.component.scss']
})
export class RoomPageSelectionComponent {
  constructor(private authService: AuthService, private router: Router) {}

  navigateToPage(pageNumber: number): void {
    switch (pageNumber) {
      case 1:
        this.router.navigate(['gestaodocampus/rooms/CreateRoom']);
        break;
      case 2:
        this.router.navigate(['gestaodocampus']);
        break;
      default:
        break;
    }
  }
}
