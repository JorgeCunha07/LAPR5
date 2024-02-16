import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../IService/services/auth.service";
import RobotDTO from 'src/app/dto/RobotDTO';
import { RobotService } from 'src/app/IService/services/robot.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './robot-page-manage-robots.component.html',
  styleUrls: ['./robot-page-manage-robots.component.scss']
})
export class RobotPageManageRobotsComponent implements OnInit {
  results: RobotDTO[] = [];
  filteredResults: RobotDTO[] = [];
  robotCodeFilter: string = '';

  constructor(private authService: AuthService, private robotService: RobotService, private router: Router) {}

  toggleRobotState(robot: RobotDTO): void {
    // Toggle the robot's state (enabled to disabled and vice versa)
    robot.enabled = !robot.enabled;

    // Determine the API endpoint based on the new state
    const endpoint = robot.enabled
      ? `robots/${robot.robotCode}/enable`
      : `robots/${robot.robotCode}/disable`;

    this.robotService.updateRobotState(endpoint).subscribe({
      next: () => console.log('Robot state updated successfully'),
      error: error => console.error('Error updating robot state', error)
    });
  }

  ngOnInit() {
    this.robotService.getList().subscribe({
      next: (data: RobotDTO[]) => {
        this.results = data.sort((a, b) => a.robotNickname.localeCompare(b.robotNickname));
        this.filteredResults = [...this.results]; // Initialize filteredResults
        console.log(this.results);
      },
      error: (error) => {
        console.error('Failed to load robots', error);
      }
    });
  }

  // Method to apply the filter
  applyFilter() {
    if (this.robotCodeFilter) {
      this.filteredResults = this.results.filter(
        robot => robot.robotCode.toLowerCase().includes(this.robotCodeFilter.toLowerCase())
      );
    } else {
      this.filteredResults = [...this.results];
    }
  }

  goBack() {
    this.router.navigate(['fleet/robot']);
  }
}
