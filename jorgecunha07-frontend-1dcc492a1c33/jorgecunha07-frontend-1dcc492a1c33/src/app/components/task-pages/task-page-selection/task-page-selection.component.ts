import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAuthDTO} from "../../../dto/IAuthDTO";
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-task-page-selection',
  templateUrl: './task-page-selection.component.html',
  styleUrls: ['./task-page-selection.component.scss']
})
export class TaskPageSelectionComponent implements OnInit, OnDestroy {
  infoUser: IAuthDTO | null = null;
  private userInfoSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userInfoSubscription = this.authService.userInfo.subscribe(userInfo => {
      this.infoUser = userInfo;
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  ngOnDestroy(): void {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }


  // Define the paths as properties of the class
  module1Path = 'task/createTransportTask';
  module2Path = 'task/createsurveillanceTask';
  module3Path = 'task/requestedTasks';
  module4Path = 'task/searchTasks';
  module5Path = 'task/planeamentodetarefas';
  module6Path = 'task/planeamentosequenciadetarefas';
  module7Path = 'modules';
  module8Path = 'task/robot';
}
