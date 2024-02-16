import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { FloorPageCreateFloorComponent } from './floor-page-create-floor.component';
import { AuthService } from "../../../IService/services/auth.service";
import { FloorService } from "../../../IService/services/floor.service";
import { BuildingService } from "../../../IService/services/building.service";
import { Router } from "@angular/router";
import { of, throwError } from 'rxjs';
import BuildingDTO from "../../../dto/BuildingDTO";
import FloorDTO from '../../../dto/IFloorDTO';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FloorPageCreateFloorComponent', () => {
  let component: FloorPageCreateFloorComponent;
  let fixture: ComponentFixture<FloorPageCreateFloorComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockFloorService: jasmine.SpyObj<FloorService>;
  let mockBuildingService: jasmine.SpyObj<BuildingService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['methodNames']); // Replace 'methodNames' with actual methods used
    mockFloorService = jasmine.createSpyObj('FloorService', ['createFloor']);
    mockBuildingService = jasmine.createSpyObj('BuildingService', ['getList']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule], // Include FormsModule here
      declarations: [ FloorPageCreateFloorComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: FloorService, useValue: mockFloorService },
        { provide: BuildingService, useValue: mockBuildingService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorPageCreateFloorComponent);
    component = fixture.componentInstance;

    // Mock the return values of the services
    mockBuildingService.getList.and.returnValue(of([])); // Empty array as mock return value

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load buildings on init', () => {
    expect(mockBuildingService.getList).toHaveBeenCalled();
    expect(component.listBuildings).toEqual([]);
  });

  it('should handle create floor', () => {
    const floor: FloorDTO = {
      buildingFinderId: 'building123', // Replace with the actual building ID
      floorNumber: 2,
      floorDescription: 'Second Floor',
      floorMaxDimensions: {
        width: 100,
        length: 150,
      },
    };
    mockFloorService.createFloor.and.returnValue(of(floor));
    component.createFloor();
    expect(mockFloorService.createFloor).toHaveBeenCalledWith(component.floor);
  });

  it('should navigate back on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['gestaodocampus/floors']);
  });

});
