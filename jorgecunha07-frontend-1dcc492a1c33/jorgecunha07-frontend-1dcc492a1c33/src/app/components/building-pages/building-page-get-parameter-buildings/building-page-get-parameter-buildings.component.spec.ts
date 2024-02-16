import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { BuildingPageGetParameterBuildingsComponent } from './building-page-get-parameter-buildings.component';
import { AuthService } from "../../../IService/services/auth.service";
import { BuildingService } from "../../../IService/services/building.service";
import { of, throwError } from 'rxjs';
import Building_FloorsDTO from "../../../dto/Building_FloorsDTO";

describe('BuildingPageGetParameterBuildingsComponent', () => {
  let component: BuildingPageGetParameterBuildingsComponent;
  let fixture: ComponentFixture<BuildingPageGetParameterBuildingsComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockBuildingService: jasmine.SpyObj<BuildingService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['someMethod']); // Replace 'someMethod' with actual methods used in your component
    mockBuildingService = jasmine.createSpyObj('BuildingService', ['getListByParameters']);

    TestBed.configureTestingModule({
      declarations: [ BuildingPageGetParameterBuildingsComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule // Include HttpClientTestingModule here
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: BuildingService, useValue: mockBuildingService }
      ]
    });

    fixture = TestBed.createComponent(BuildingPageGetParameterBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and sort buildings by floors when valid parameters are provided', () => {
    component.minFloors = 1;
    component.maxFloors = 5;

    const mockBuildings: Building_FloorsDTO[] = [
      { buildingCode: 'B02', buildingName: 'Building B', buildingDescription: 'Description B', floorsNumber: 4, buildingSize: { width: 60, length: 80 } },
      { buildingCode: 'A01', buildingName: 'Building A', buildingDescription: 'Description A', floorsNumber: 2, buildingSize: { width: 50, length: 70 } }
    ];

    mockBuildingService.getListByParameters.and.returnValue(of(mockBuildings));

    component.getBuildingsWithParameters();
    fixture.detectChanges();

    expect(mockBuildingService.getListByParameters).toHaveBeenCalledWith(1, 5);
    expect(component.results.length).toBe(2);
    expect(component.results[0].floorsNumber).toBeLessThanOrEqual(component.results[1].floorsNumber);
  });

  it('should not call buildingService when invalid floor parameters are provided', () => {
    component.minFloors = -1; // Invalid minimum floors
    component.maxFloors = 5;

    component.getBuildingsWithParameters();
    expect(mockBuildingService.getListByParameters).not.toHaveBeenCalled();
  });

  it('should not call buildingService when maxFloors is less than minFloors', () => {
    component.minFloors = 6;
    component.maxFloors = 5; // maxFloors less than minFloors

    component.getBuildingsWithParameters();
    expect(mockBuildingService.getListByParameters).not.toHaveBeenCalled();
  });

  it('should handle no results found', () => {
    component.minFloors = 1;
    component.maxFloors = 5;

    mockBuildingService.getListByParameters.and.returnValue(of([])); // No buildings found

    component.getBuildingsWithParameters();
    fixture.detectChanges();

    expect(component.results.length).toBe(0);
  });


  it('should update minFloors and maxFloors based on input changes', () => {
    const compiled = fixture.nativeElement;
    const minFloorsInput = compiled.querySelector('input[placeholder="Min Floors"]');
    const maxFloorsInput = compiled.querySelector('input[placeholder="Max Floors"]');

    minFloorsInput.value = '2';
    minFloorsInput.dispatchEvent(new Event('input'));
    maxFloorsInput.value = '4';
    maxFloorsInput.dispatchEvent(new Event('input'));

    expect(component.minFloors).toBe(2);
    expect(component.maxFloors).toBe(4);
  });
});
