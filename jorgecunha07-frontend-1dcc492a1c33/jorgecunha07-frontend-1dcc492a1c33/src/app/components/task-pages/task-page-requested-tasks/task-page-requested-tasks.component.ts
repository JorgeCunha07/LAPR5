import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";
import {TaskDTO} from "../../../dto/TaskDTO";
import {Taskservice} from "../../../IService/services/taskservice";
import {TaskStatusEnum} from "../../../Constants/TastStatusEnum";
import {TaskTypeEnum} from "../../../Constants/TaskTypeEnum";

@Component({
  selector: 'app-task-page-requested-tasks',
  templateUrl: './task-page-requested-tasks.component.html',
  styleUrls: ['./task-page-requested-tasks.component.scss']
})
export class TaskPageRequestedTasksComponent implements OnInit{

  listTasks:TaskDTO[] = [];
  constructor(private authService: AuthService, private router: Router,private taskService: Taskservice) {
  }

  name = "";
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadTasksSubmited();
  }

  goBack(){
    this.router.navigate(['task']);
  }


  private loadTasksSubmited(): void {
    this.taskService.getSubmitedTasks().subscribe({
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

  protected approveTask(name: string): void {
    this.taskService.approvedOrRejectTask(name, "Approved").subscribe(
    () => {
      this.successMessage = 'Task approved successfully!';
      this.errorMessage = '';
      this.loadTasksSubmited();
    },
    (error) => {
      this.errorMessage = 'Error approving task: ' + error.message;
      this.successMessage = '';
    }
  );
  }

  protected rejectTask(name: string): void {
      this.taskService.approvedOrRejectTask(name,"Rejected").subscribe(
        () => {
          this.successMessage = 'Task rejected successfully!';
          this.errorMessage = '';
          this.loadTasksSubmited();
        },
        (error) => {
          this.errorMessage = 'Error rejecting task: ' + error.message;
          this.successMessage = '';
        }
      );
    }


  protected readonly String = String;
}
