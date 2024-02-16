import { Component } from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-information-page-privacypolicy',
  templateUrl: './information-page-privacypolicy.component.html',
  styleUrls: ['./information-page-privacypolicy.component.scss']
})
export class InformationPagePrivacypolicyComponent {
  constructor(private authService: AuthService, private router: Router) {}

}
