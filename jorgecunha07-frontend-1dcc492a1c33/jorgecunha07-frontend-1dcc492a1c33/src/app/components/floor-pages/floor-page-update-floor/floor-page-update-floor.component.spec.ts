import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { FloorPageUpdateFloorComponent } from './floor-page-update-floor.component';
import { AuthService } from "../../../IService/services/auth.service";
import { FloorService } from "../../../IService/services/floor.service";
import { BuildingService } from "../../../IService/services/building.service";
import { Router } from "@angular/router";
import { of } from 'rxjs';
import BuildingDTO from "../../../dto/BuildingDTO";
import FloorDTO from '../../../dto/IFloorDTO';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FloorPageUpdateFloorComponent', () => {
  let component: FloorPageUpdateFloorComponent;
  let fixture: ComponentFixture<FloorPageUpdateFloorComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockFloorService: jasmine.SpyObj<FloorService>;
  let mockBuildingService: jasmine.SpyObj<BuildingService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['methodNames']); // Replace 'methodNames' with actual methods used
    mockFloorService = jasmine.createSpyObj('FloorService', ['updateFloor', 'getFloorsList']);
    mockBuildingService = jasmine.createSpyObj('BuildingService', ['getList']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule], // Include FormsModule here
      declarations: [ FloorPageUpdateFloorComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: FloorService, useValue: mockFloorService },
        { provide: BuildingService, useValue: mockBuildingService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorPageUpdateFloorComponent);
    component = fixture.componentInstance;

    // Mock the return values of the services
    mockBuildingService.getList.and.returnValue(of([])); // Empty array as mock return value
    mockFloorService.getFloorsList.and.returnValue(of([])); // Empty array as mock return value

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load buildings and floors on init', () => {
    expect(mockBuildingService.getList).toHaveBeenCalled();
    expect(mockFloorService.getFloorsList).toHaveBeenCalled();
    expect(component.listBuildings).toEqual([]);
    expect(component.listFloors).toEqual([]);
  });

  it('should handle update floor', () => {
    const floor: FloorDTO = {
      buildingFinderId: 'building123', // Replace with the actual building ID
      floorNumber: 2,
      floorDescription: 'Second Floor',
      floorMaxDimensions: {
        width: 100,
        length: 150,
      },
    };
    mockFloorService.updateFloor.and.returnValue(of(floor));
    component.updateFloor();
    expect(mockFloorService.updateFloor).toHaveBeenCalledWith(component.floor);
  });

  it('should navigate back on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['gestaodocampus/floors']);
  });

});
