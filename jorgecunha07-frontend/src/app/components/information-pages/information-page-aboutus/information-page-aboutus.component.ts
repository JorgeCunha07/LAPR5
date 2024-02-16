import { Component } from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-information-page-aboutus',
  templateUrl: './information-page-aboutus.component.html',
  styleUrls: ['./information-page-aboutus.component.scss']
})
export class InformationPageAboutusComponent {
  constructor(private authService: AuthService, private router: Router) {}

}
