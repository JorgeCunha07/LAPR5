import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../IService/services/auth.service";
import {IAuthDTO} from "../../dto/IAuthDTO";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-modules-page-selection',
  templateUrl: './modules-page-selection.component.html',
  styleUrls: ['./modules-page-selection.component.scss']
})
export class ModulesPageSelectionComponent implements OnInit, OnDestroy {
  infoUser: IAuthDTO | null = null;
  private userInfoSubscription: Subscription | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the userInfo observable
    this.userInfoSubscription = this.authService.userInfo.subscribe(
      (userInfo: IAuthDTO | null) => {
        this.infoUser = userInfo;
      }
    );
  }

  // Define the paths as properties of the class
  module1Path = '/gestaodocampus';
  module2Path = '/fleet';
  module3Path = '/task';
  module4Path = '/3dvisualization';
  module5Path = '/AdminInformation';
  module6Path = '/information';
  module7Path = '/PersonalInformation';



  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }
  signOut(): void {
    this.deleteLocalStorage();
    this.navigateTo('/login'); // Assuming you want to navigate to the login page after signing out
  }

  deleteLocalStorage(): void {
    localStorage.clear();
  }

}
