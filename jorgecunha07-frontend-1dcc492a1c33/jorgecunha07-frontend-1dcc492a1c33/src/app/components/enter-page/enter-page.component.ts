import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-page',
  templateUrl: './enter-page.component.html',
  styleUrls: ['./enter-page.component.scss']
})
export class EnterPageComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/mainpage']);
  }

}
