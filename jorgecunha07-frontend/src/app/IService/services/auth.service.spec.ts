import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { EndPointConfiguration } from '../../Constants/EndPointConfiguration';
import {IUserDTO} from "../../dto/IUserDTO";
import IRoleDTO from "../../dto/IRoleDTO";

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should login successfully', fakeAsync(() => {
    const credentials = { email: 'test@example.com', password: 'password' };
    const mockLoginResponse = { token: 'mock-token' };
    const mockVerifyResponse = {
      email: 'test@example.com',
      isAuthenticated: true,
      role: 'user'
    };

    authService.login(credentials).subscribe((result) => {
      expect(result).toBe(true);
    });

    // Handle the login request
    const loginReq = httpTestingController.expectOne(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/signin`);
    expect(loginReq.request.method).toBe('POST');
    loginReq.flush(mockLoginResponse);

    // Handle the token verification request
    const verifyTokenReq = httpTestingController.expectOne(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/verifyToken`);
    expect(verifyTokenReq.request.method).toBe('GET');
    verifyTokenReq.flush(mockVerifyResponse);

    tick();

    expect(authService.isAuthenticated).toBe(true);
  }));


  it('should sign up a user successfully', fakeAsync(() => {
        const mockResponse: IUserDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123',
      role: "Role One",
      userNif: 'nif123',
      userNumber: 'user123'
    };

    const userData: IUserDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123',
      role: "Role One",
      userNif: 'nif123',
      userNumber: 'user123'
    };

    authService.signUp(userData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/signup`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    tick();
  }));

  it('should sign out a user successfully', fakeAsync(() => {
    const mockResponse = { /* ...response after successful signout... */ };

    authService.signOut().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/logout`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    tick();
  }));

  it('should retrieve user information successfully', fakeAsync(() => {
    const email = 'test@example.com';
    const mockResponse: IUserDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123',
      role: "Role One",
      userNif: 'nif123',
      userNumber: 'user123'
    };
    const userInfo : IUserDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123',
      role: "Role One",
      userNif: 'nif123',
      userNumber: 'user123'
    };
    authService.getUserInfo(email).subscribe(userInfo => {
      expect(userInfo).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/userInfo/${email}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    tick();
  }));

  it('should delete a user successfully', fakeAsync(() => {
    const email = 'test@example.com';
    const mockResponse = { /* ...response after successful deletion... */ };

    authService.deleteUser(email).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/userInfo/${email}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);

    tick();
  }));


  it('should refresh token successfully', fakeAsync(() => {
    const data = { /* ...data required for refresh token... */ };
    const mockResponse = { /* ...mock response for refreshed token... */ };

    authService.refreshToken(data).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/refreshtoken`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    tick();
  }));

  it('should update user info successfully', fakeAsync(() => {
    const flag = 'someFlag';
    const userDTO: IUserDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      role: "Role One",
      userNif: 'nif123',
      userNumber: 'user123'
      // Add other required properties here
    };
    const mockResponse = { /* ...mock response after updating user info... */ };

    authService.updateUserInfo(flag, userDTO).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/updateUserInfo/${flag}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);

    tick();
  }));

  it('should approve user request successfully', fakeAsync(() => {
    const email = 'test@example.com';
    const data = { /* ...data for approving user request... */ };
    const mockResponse = { /* ...response after approving user request... */ };

    authService.approveUserRequest(email, data).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/userRequest/${email}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);

    tick();
  }));

  it('should delete user request successfully', fakeAsync(() => {
    const email = 'test@example.com';
    const mockResponse = { /* ...response after deleting user request... */ };

    authService.deleteUserRequest(email).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${EndPointConfiguration.AUTH_ENDPOINT}/auth/userRequest/${email}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);

    tick();
  }));

  it('should get roles available successfully', fakeAsync(() => {
    // Assuming IRoleDTO has properties id and name
    const mockResponse: IRoleDTO[] = [
      { id: 'role1', name: 'Role One' },
      { id: 'role2', name: 'Role Two' }
      // Populate with more roles if needed
    ];

    authService.getRolesAvailable().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${EndPointConfiguration.AUTH_ENDPOINT}/roles`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    tick();
  }));

});
