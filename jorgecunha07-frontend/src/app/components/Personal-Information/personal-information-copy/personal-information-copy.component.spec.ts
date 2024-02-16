import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { PersonalInformationCopyComponent } from './personal-information-copy.component';
import { AuthService } from "../../../IService/services/auth.service";
import { Router } from "@angular/router";
import { of } from 'rxjs';
import { IUser_Model } from "../../../models/IUser_Model";
import { FormsModule } from "@angular/forms";

describe('PersonalInformationCopyComponent', () => {
  let component: PersonalInformationCopyComponent;
  let fixture: ComponentFixture<PersonalInformationCopyComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUser: IUser_Model={
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    role: "user",
    userNif: "123456789",
    userNumber: "12345"
  };


  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getUserInfo']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      role: "user",
      userNif: "123456789",
      userNumber: "12345"
    };

    // Use Object.defineProperty to mock the userInfo Observable
    Object.defineProperty(mockAuthService, 'userInfo', {
      get: () => of(mockUser)
    });

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PersonalInformationCopyComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
    mockAuthService.getUserInfo.and.returnValue(of(mockUser))
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load personal information on init', fakeAsync(() => {
    // Trigger ngOnInit
    component.ngOnInit();
    tick();

    expect(component.personalInfo.email).toEqual(mockUser.email);
    expect(mockAuthService.getUserInfo).toHaveBeenCalledWith(mockUser.email);
  }));

  it('should navigate back to PersonalInformation', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['PersonalInformation']);
  });

});
