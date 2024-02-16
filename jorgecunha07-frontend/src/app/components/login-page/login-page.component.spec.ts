import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from "@angular/router";
import { AuthService } from '../../IService/services/auth.service';
import { LoginPageComponent } from './login-page.component';
import {of, throwError} from 'rxjs';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: Router;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    spyOn(mockRouter, 'navigate');
    fixture.detectChanges();
  });

  it('should navigate to "modules" on successful login', () => {
    mockAuthService.login.and.returnValue(of(true)); // Mock return value for login
    component.model = { username: 'user', password: 'pass' };
    component.onSubmit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['modules']);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "modules" on successful login', () => {
    mockAuthService.login.and.returnValue(of(true));
    component.model = { username: 'user', password: 'pass' };
    component.onSubmit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['modules']);
  });

  it('should show error on unsuccessful login', () => {
    mockAuthService.login.and.returnValue(of(false));
    component.model = { username: 'user', password: 'wrongpass' };
    component.onSubmit();
    expect(component.showError).toBeTrue();
  });

  it('should display error message on login error', () => {
    const errorResponse = new Error('Invalid credentials, please try again.');
    mockAuthService.login.and.returnValue(throwError(() => errorResponse));
    component.onSubmit();
    expect(component.errorMessage).toBe('Invalid credentials, please try again.');
    expect(component.showErrorPopup).toBeTrue();
  });

  it('should clear error message when clearError is called', () => {
    component.errorMessage = 'Error';
    component.clearError();
    expect(component.errorMessage).toBe('');
  });

  it('should close error popup when closePopup is called', () => {
    component.showErrorPopup = true;
    component.closePopup();
    expect(component.showErrorPopup).toBeFalse();
  });

});
