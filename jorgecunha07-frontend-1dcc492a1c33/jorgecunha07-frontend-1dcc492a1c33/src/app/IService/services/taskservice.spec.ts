import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { EndPointConfiguration } from '../../Constants/EndPointConfiguration';
import TransportTaskDTO from '../../dto/TransportTaskDTO';
import {Taskservice} from "./taskservice";
import {of} from "rxjs";

// import other necessary DTOs and Models
describe('Taskservice', () => {
  let taskService: Taskservice;
  let httpTestingController: HttpTestingController;
  let authServiceMock: Partial<AuthService>;

  beforeEach(() => {
    authServiceMock = {
      token: of('mock-token'), // Replace 'of' with the appropriate Observable creation method
      // Add any other necessary mock implementations or properties
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Taskservice,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    taskService = TestBed.inject(Taskservice);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create a transport task successfully', fakeAsync(() => {
    const mockTransportTask: TransportTaskDTO = {
      Description: 'Sample Transport Task',
      FromLocation: {
        Building: 'Building A',
        Room: 101,
        X: 50,
        Y: 50
      },
      ToLocation: {
        Building: 'Building B',
        Room: 201,
        X: 100,
        Y: 100
      },
      ContactStart: '2024-01-01T09:00:00',
      ContactEnd: '2024-01-01T10:00:00',
      User: 'user123',
      RobotId: 'robot789',
      RobotType: 'Type1',
      name: 'Task1'
    };

    const mockResponse = { /* expected response data */ };

    taskService.createTransportTask(mockTransportTask).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${EndPointConfiguration.TASK_DATA_ENDPOINT}/TransportTask/create`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    tick();
  }));

  // ... other test cases
});
