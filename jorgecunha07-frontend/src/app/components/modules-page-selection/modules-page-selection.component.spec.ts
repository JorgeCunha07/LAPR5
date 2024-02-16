import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {of, Subscription} from 'rxjs';
import { AuthService } from '../../IService/services/auth.service';
import { IAuthDTO } from '../../dto/IAuthDTO';
import { ModulesPageSelectionComponent } from './modules-page-selection.component';

describe('ModulesPageSelectionComponent', () => {
  let component: ModulesPageSelectionComponent;
  let fixture: ComponentFixture<ModulesPageSelectionComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUserInfo: IAuthDTO = {
    email: 'test@example.com',
    isAuthenticated: true,
    role: 'user' // Adjust as per your IAuthDTO interface
  };

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', [], {
      userInfo: of(mockUserInfo) // Mock the userInfo Observable
    });
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ModulesPageSelectionComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulesPageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set infoUser correctly from authService', () => {
    expect(component.infoUser).toEqual(mockUserInfo);
  });

  // Indirectly test ngOnDestroy's unsubscribe behavior
  it('should handle ngOnDestroy correctly', () => {
    // Access the private member using bracket notation
    const unsubscribeSpy = spyOn(component['userInfoSubscription'] as Subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should navigate to correct path on navigateTo', () => {
    const path = '/testPath';
    component.navigateTo(path);
    expect(mockRouter.navigate).toHaveBeenCalledWith([path]);
  });

  it('should clear local storage and navigate to login on signOut', () => {
    spyOn(localStorage, 'clear');
    component.signOut();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  // Add more tests as needed
});
