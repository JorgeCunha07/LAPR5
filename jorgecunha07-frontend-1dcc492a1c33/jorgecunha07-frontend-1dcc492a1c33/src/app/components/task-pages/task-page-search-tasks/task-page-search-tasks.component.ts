import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../IService/services/auth.service";
import { Router } from "@angular/router";
import { TaskDTO } from "../../../dto/TaskDTO";
import { Taskservice } from "../../../IService/services/taskservice";
import { TaskTypeEnum } from "../../../Constants/TaskTypeEnum";
import { TaskStatusEnum } from "../../../Constants/TastStatusEnum";
import {Task_Model} from "../../../models/Task_Model";

type SortableTaskKeys = keyof TaskDTO;

@Component({
  selector: 'app-task-page-search-tasks',
  templateUrl: './task-page-search-tasks.component.html',
  styleUrls: ['./task-page-search-tasks.component.scss']
})
export class TaskPageSearchTasksComponent implements OnInit {
  listTasks: Task_Model[] = [];
  filter = { taskType: '', taskStatus: '', user: '' };
  currentSortColumn: SortableTaskKeys | null = null;
  sortAscending = true;

  constructor(private authService: AuthService, private router: Router, private taskService: Taskservice) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  goBack() {
    this.router.navigate(['task']);
  }

  sortTable(column: SortableTaskKeys): void {
    if (this.currentSortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.currentSortColumn = column;
      this.sortAscending = true;
    }

    this.listTasks.sort((a, b) => {
      let comparison = 0;
      const aValue = a[column];
      const bValue = b[column];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      }

      return this.sortAscending ? comparison : -comparison;
    });
  }

  private loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data: TaskDTO[]) => {
        this.listTasks = data.map((task: TaskDTO) => ({
          ...task,
          taskType: TaskTypeEnum[task.taskType],
          taskStatus: TaskStatusEnum[task.taskStatus]
        })) as unknown as TaskDTO[];
      },
      error: (error) => console.error('Failed to load tasks', error)
    });
  }

  get filteredTasks(): Task_Model[] {
    return this.listTasks.filter(task => {
      const taskTypeMatch = this.filter.taskType ?
        task.taskType.toString().toLowerCase().includes(this.filter.taskType.toLowerCase()) : true;
      const taskStatusMatch = this.filter.taskStatus ?
        task.taskStatus.toString().toLowerCase().includes(this.filter.taskStatus.toLowerCase()) : true;
      const userMatch = this.filter.user ?
        task.user.toLowerCase().includes(this.filter.user.toLowerCase()) : true;

      return taskTypeMatch && taskStatusMatch && userMatch;
    });
  }
}
