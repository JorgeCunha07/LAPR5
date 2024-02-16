import { Component } from '@angular/core';
import {AuthService} from "../../../IService/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-information-page-rgpd',
  templateUrl: './information-page-rgpd.component.html',
  styleUrls: ['./information-page-rgpd.component.scss']
})
export class InformationPageRgpdComponent {
  constructor(private authService: AuthService, private router: Router) {}

}
