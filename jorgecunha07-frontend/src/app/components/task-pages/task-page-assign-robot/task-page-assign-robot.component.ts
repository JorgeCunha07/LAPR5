import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../IService/services/auth.service";
import { Router } from "@angular/router";
import { Taskservice } from "../../../IService/services/taskservice";
import { Subscription } from "rxjs";
import { TaskTypeEnum } from 'src/app/Constants/TaskTypeEnum';

@Component({
  selector: 'app-task-page-assign-robot',
  templateUrl: './task-page-assign-robot.component.html',
  styleUrls: ['./task-page-assign-robot.component.scss']
})
export class TaskPageAssignRobotComponent implements OnInit {

  submittedTasks: any[] = [];
  enabledRobots: any[] = [];
  selectedTask: string = '';
  selectedRobot: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private taskService: Taskservice) {
  }

  ngOnInit(): void {
    this.getSubmittedTasks();
  }

  getSubmittedTasks() {
    this.taskService.getSubmitedTasks().subscribe(
      (tasks: any) => {
        this.submittedTasks = tasks;
      },
      (error) => {
        console.error('Error fetching submitted tasks:', error);
      }
    );
  }

  onTaskSelect() {
      const selectedTaskType = this.submittedTasks.find(task => task.name === this.selectedTask)?.taskType;

        const taskTypeEnumString = this.mapTaskTypeEnumToString(selectedTaskType);

        this.taskService.getEnabledRobotsWithTaskType(taskTypeEnumString).subscribe(
          (robots: any) => {
            this.enabledRobots = robots;
          },
          (error) => {
            console.error('Error fetching enabled robots:', error);
          }
        );
    }

  mapTaskTypeEnumToString(taskType: TaskTypeEnum): string {
    switch (taskType) {
      case TaskTypeEnum.TransportTask:
        return 'TransportTask';
      case TaskTypeEnum.SurveillanceTask:
        return 'SurveillanceTask';
      default:
        console.error('Invalid task type:', taskType);
        return '';
    }
  }

  assignRobotToTask() {
    if (!this.selectedTask || !this.selectedRobot) {
      this.errorMessage = 'Please select both a task and a robot.';
      return;
    }

    this.taskService
      .assignRobotToTask(this.selectedTask, this.selectedRobot, this.enabledRobots.find((robot) => robot.robotCode === this.selectedRobot)?.robotTypeName)
      .subscribe(
        (response) => {
          this.successMessage = 'Robot assigned to task successfully.';
        },
        (error) => {
          console.error('Error assigning robot to task:', error);
          this.errorMessage = 'Error assigning robot to task.';
        }
      );
  }

  goBack() {
    this.router.navigate(['task']);
  }

  getTaskType(selectedTask: string): string {
    const task = this.submittedTasks.find(task => task.name === selectedTask);
    return task ? this.mapTaskTypeEnumToString(task.taskType) : '';
  }
}
