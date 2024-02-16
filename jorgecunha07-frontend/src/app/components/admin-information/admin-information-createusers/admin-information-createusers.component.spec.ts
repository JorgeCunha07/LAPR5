import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AdminInformationCreateusersComponent } from './admin-information-createusers.component';
import { AuthService } from "../../../IService/services/auth.service";
import { Router } from "@angular/router";
import { of, throwError } from 'rxjs';
import IRoleDTO from "../../../dto/IRoleDTO";
import { FormsModule } from '@angular/forms';

describe('AdminInformationCreateusersComponent', () => {
  let component: AdminInformationCreateusersComponent;
  let fixture: ComponentFixture<AdminInformationCreateusersComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getRolesAvailable', 'signUp']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AdminInformationCreateusersComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInformationCreateusersComponent);
    component = fixture.componentInstance;

    const mockRoles: IRoleDTO[] = [{ id: '1', name: 'Role 1' }, { id: '2', name: 'Role 2' }];
    mockAuthService.getRolesAvailable.and.returnValue(of(mockRoles));

    fixture.detectChanges();
  });

  it('should handle error when creating user fails', fakeAsync(() => {
    const error = { error: { errors: { message: 'Error message' } } };
  }));
});
