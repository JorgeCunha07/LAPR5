import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { PersonalInformationPagesComponent } from './personal-information-pages.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from "../../../IService/services/auth.service";
import {FormsModule} from "@angular/forms";

describe('PersonalInformationPagesComponent', () => {
  let component: PersonalInformationPagesComponent;
  let fixture: ComponentFixture<PersonalInformationPagesComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Correctly create a spy object for AuthService
    mockAuthService = jasmine.createSpyObj('AuthService', ['someMethod']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);


    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [PersonalInformationPagesComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to modifyPersonalData on navigateToPage(1)', () => {
    component.navigateToPage(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['PersonalInformation/modifyPersonalData']);
  });

  it('should navigate to InformationCopy on navigateToPage(2)', () => {
    component.navigateToPage(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['PersonalInformation/InformationCopy']);
  });

  it('should navigate to deleteAccount on navigateToPage(3)', () => {
    component.navigateToPage(3);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['PersonalInformation/deleteAccount']);
  });

  it('should navigate to modules on navigateToPage(4)', () => {
    component.navigateToPage(4);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['modules']);
  });

  it('should handle unknown page number in navigateToPage', () => {
    component.navigateToPage(999);
  });
});
