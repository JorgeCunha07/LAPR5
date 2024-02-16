import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../IService/services/auth.service";
import { Router } from "@angular/router";
import { Taskservice } from "../../../IService/services/taskservice";
import { Task_Full_InfoDTO } from "../../../dto/Task_Full_InfoDTO";
import {SequenceResultDTO} from "../../../dto/SequenceResultDTO";
import {Task_Full_Info_Model} from "../../../models/Task_Full_Info_Model";

@Component({
  selector: 'app-task-page-sequence-execution-tasks',
  templateUrl: './task-page-sequence-execution-tasks.component.html',
  styleUrls: ['./task-page-sequence-execution-tasks.component.scss']
})
export class TaskPageSequenceExecutionTasksComponent implements OnInit {
  listTasks: Task_Full_InfoDTO[] = [];
  selectedTasks: Task_Full_InfoDTO[] = []; // Array to hold selected tasks
  sequenceResult: SequenceResultDTO | null = null;
  constructor(private authService: AuthService, private router: Router, private taskService: Taskservice) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  goBack() {
    this.router.navigate(['task']);
  }

  private loadTasks(): void {
    this.taskService.getAllTasksWithAllInformation().subscribe({
      next: (data: Task_Full_InfoDTO[]) => {
        this.listTasks = data;
      },
      error: (error) => console.error('Failed to load tasks', error)
    });
  }

  onSelectTask(task: Task_Full_InfoDTO): void {
    if (this.isTaskSelected(task)) {
      this.selectedTasks = this.selectedTasks.filter(t => t.name !== task.name);
    } else {
      this.selectedTasks.push(task); // Add the task to selectedTasks
    }
  }

  isTaskSelected(task: Task_Full_InfoDTO): boolean {
    return this.selectedTasks.some(t => t.name === task.name);
  }

  formatLocation(location: { building: string, room: number, x: number, y: number }): string {
    return `Building: ${location.building}, Room: ${location.room}, Coordinates: (${location.x}, ${location.y})`;
  }

  sendSelectedTasksBack(): void {
    this.taskService.createTasksAndBestSequence(this.selectedTasks).subscribe({
      next: (result: SequenceResultDTO) => {
        this.sequenceResult = result;
        console.log(result);

        console.log('Minimum Cost:', result.minCost);
        console.log('Minimum Sequence:', result.minSequence);
        // Handle the result as needed
      },
      error: (error) => {
        console.log(error.error().message());
        console.error('Failed to create tasks and sequence', error);
        this.sequenceResult = null;
      }
    });
  }
}
