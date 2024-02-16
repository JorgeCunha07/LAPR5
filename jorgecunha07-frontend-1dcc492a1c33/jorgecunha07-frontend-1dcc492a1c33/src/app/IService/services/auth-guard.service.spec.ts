import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuardService]
    });

    service = TestBed.inject(AuthGuardService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow the authenticated user to access app', () => {
    localStorage.setItem('user_info', JSON.stringify({ isAuthenticated: true }));
    expect(service.canActivate()).toBeTrue();
  });

  it('should redirect an unauthenticated user to the login page', () => {
    spyOn(router, 'navigate');
    localStorage.removeItem('user_info');
    service.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  // Add more tests as needed to cover different scenarios
});
