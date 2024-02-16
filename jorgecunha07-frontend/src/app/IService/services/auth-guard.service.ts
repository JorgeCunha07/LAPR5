import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import {IAuthDTO} from "../../dto/IAuthDTO";

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userInfoJson = localStorage.getItem('user_info');
    if (userInfoJson) {
      const userInfo: IAuthDTO = JSON.parse(userInfoJson);
      if (userInfo.isAuthenticated) {
        return true;
      }
    }

    // Navigate to login if there's no user info or if isAuthenticated is false
    this.router.navigate(['/login']);
    return false;
  }
}
