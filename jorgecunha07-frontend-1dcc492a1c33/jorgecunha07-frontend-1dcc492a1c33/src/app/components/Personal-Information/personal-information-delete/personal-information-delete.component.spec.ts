import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../../IService/services/auth.service';
import { PersonalInformationDeleteComponent } from './personal-information-delete.component';
import { IUser_Model } from '../../../models/IUser_Model';
import {FormsModule} from "@angular/forms";

describe('PersonalInformationDeleteComponent', () => {
  let component: PersonalInformationDeleteComponent;
  let fixture: ComponentFixture<PersonalInformationDeleteComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUser: IUser_Model;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getUserInfo', 'deleteUser']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockUser = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password', role: 'user', userNif: '123456789', userNumber: '12345' };

    // Use Object.defineProperty to mock the userInfo Observable
    Object.defineProperty(mockAuthService, 'userInfo', {
      get: () => of(mockUser)
    });

    await TestBed.configureTestingModule({
      declarations: [ PersonalInformationDeleteComponent ],
      imports: [ FormsModule ], // Import FormsModule here
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load personal information on init', () => {
    mockAuthService.getUserInfo.and.returnValue(of(mockUser));
    component.ngOnInit();
    expect(mockAuthService.getUserInfo).toHaveBeenCalledWith(mockUser.email);
  });

  it('should handle user information loading error', () => {
    const error = new Error('Failed to load user info');
    mockAuthService.getUserInfo.and.returnValue(throwError(() => error));
    spyOn(console, 'error');
    component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith('Failed to load User Information', error);
  });


  it('should handle user deletion error', () => {
    const error = new Error('Deletion failed');
    mockAuthService.deleteUser.and.returnValue(throwError(() => error));
    spyOn(console, 'error');
    component.delete();
    expect(console.error).toHaveBeenCalledWith('Failed to delete the User Information', error);
  });

  it('should navigate back on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['PersonalInformation']);
  });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = spyOn(component['userInfoSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

});
