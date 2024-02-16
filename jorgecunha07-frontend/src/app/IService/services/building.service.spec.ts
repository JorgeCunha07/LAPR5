import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BuildingService } from './building.service';
import { AuthService } from './auth.service';
import BuildingDTO from '../../dto/BuildingDTO';
import { EndPointConfiguration } from "../../Constants/EndPointConfiguration";
import { of } from 'rxjs'; // Import 'of' to create an Observable

describe('BuildingService', () => {
  let service: BuildingService;
  let httpTestingController: HttpTestingController;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    // Mock the token as an Observable
    authServiceMock = jasmine.createSpyObj('AuthService', [], { token: of('fake-token') });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BuildingService,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    service = TestBed.inject(BuildingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve all buildings', () => {
    const mockBuildings: BuildingDTO[] = [{
      buildingCode: 'B001',
      buildingName: 'Main Building',
      buildingDescription: 'Main building of the campus',
      buildingSize: { width: 100, length: 200 }
    },{
      buildingCode: 'B002',
      buildingName: 'New Building',
      buildingDescription: 'A newly constructed building',
      buildingSize: { width: 120, length: 220 }
    }];

    service.getList().subscribe(buildings => {
      expect(buildings).toEqual(mockBuildings);
    });

    const req = httpTestingController.expectOne(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/buildings/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBuildings);
  });

  it('should create a building', () => {
    const newBuilding: BuildingDTO = {
      buildingCode: 'B002',
      buildingName: 'New Building',
      buildingDescription: 'A newly constructed building',
      buildingSize: { width: 120, length: 220 }
    };


    service.createBuilding(newBuilding).subscribe(building => {
      expect(building).toEqual(newBuilding);
    });

    const req = httpTestingController.expectOne(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/buildings`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newBuilding);
    req.flush(newBuilding);
  });

});
