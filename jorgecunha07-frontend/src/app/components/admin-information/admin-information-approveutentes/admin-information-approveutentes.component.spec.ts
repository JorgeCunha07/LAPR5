import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AdminInformationApproveutentesComponent } from './admin-information-approveutentes.component';
import { AuthService } from "../../../IService/services/auth.service";
import { Router } from "@angular/router";
import { of, throwError } from 'rxjs';
import { IUserDTO } from "../../../dto/IUserDTO";

describe('AdminInformationApproveutentesComponent', () => {
  let component: AdminInformationApproveutentesComponent;
  let fixture: ComponentFixture<AdminInformationApproveutentesComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUsers: IUserDTO[];

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getAllUserRequests', 'approveUserRequest', 'deleteUserRequest']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockUsers = [
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password123', role: 'admin', userNif: '123456789', userNumber: '123' },
      { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', password: 'password456', role: 'user', userNif: '987654321', userNumber: '456' }
    ];

    await TestBed.configureTestingModule({
      declarations: [ AdminInformationApproveutentesComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInformationApproveutentesComponent);
    component = fixture.componentInstance;

    mockAuthService.getAllUserRequests.and.returnValue(of(mockUsers));
    mockAuthService.approveUserRequest.and.returnValue(of({ message: 'User approved successfully' }));
    mockAuthService.deleteUserRequest.and.returnValue(of({ message: 'User request denied successfully' }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user requests on init', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.listOfUsers).toEqual(mockUsers);
    expect(mockAuthService.getAllUserRequests).toHaveBeenCalled();
  }));


  it('should navigate back to AdminInformation', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['AdminInformation']);
  });
});
