import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FloorService } from './floor.service';
import { AuthService } from './auth.service';
import FloorDTO from '../../dto/IFloorDTO';
import {EndPointConfiguration} from "../../Constants/EndPointConfiguration";
import {of} from "rxjs";
import {BuildingService} from "./building.service";

describe('FloorService', () => {
  let service: FloorService;
  let httpTestingController: HttpTestingController;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    // Mock the token as an Observable
    authServiceMock = jasmine.createSpyObj('AuthService', [], { token: of('fake-token') });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FloorService,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    service = TestBed.inject(FloorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should create a floor', () => {
    const newFloor: FloorDTO = {
      buildingFinderId: 'B001',
      floorNumber: 1,
      floorDescription: 'First floor of Building B001',
      floorMap: undefined,
      floorMaxDimensions: {
        width: 100,
        length: 200
      }
    };

    service.createFloor(newFloor).subscribe(response => {
      expect(response).toEqual(newFloor);
    });

    const req = httpTestingController.expectOne(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/floors`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newFloor);
    req.flush(newFloor);
  });


});
