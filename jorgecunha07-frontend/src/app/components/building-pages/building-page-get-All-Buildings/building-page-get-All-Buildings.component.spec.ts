import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildingPageGetAllBuildingsComponent } from './building-page-get-All-Buildings.component';
import { AuthService } from "../../../IService/services/auth.service";
import { BuildingService } from "../../../IService/services/building.service";
import { of } from 'rxjs';
import BuildingDTO from "../../../dto/BuildingDTO";

describe('BuildingPageGetAllBuildingsComponent', () => {
  let component: BuildingPageGetAllBuildingsComponent;
  let fixture: ComponentFixture<BuildingPageGetAllBuildingsComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockBuildingService: jasmine.SpyObj<BuildingService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['someMethod']); // Replace 'someMethod' with actual methods used in your component
    mockBuildingService = jasmine.createSpyObj('BuildingService', ['getList']);

    TestBed.configureTestingModule({
      declarations: [ BuildingPageGetAllBuildingsComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: BuildingService, useValue: mockBuildingService }
      ]
    });

    fixture = TestBed.createComponent(BuildingPageGetAllBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and sort buildings when onSubmit is called', () => {
    const mockBuildings: BuildingDTO[] = [
      { buildingName: 'Z-Building', buildingCode: 'Z01', buildingDescription: 'Description Z', buildingSize: { width: 100, length: 200 } },
      { buildingName: 'A-Building', buildingCode: 'A01', buildingDescription: 'Description A', buildingSize: { width: 50, length: 100 } }
    ];

    mockBuildingService.getList.and.returnValue(of(mockBuildings));

    component.onSubmit();
    fixture.detectChanges();

    expect(mockBuildingService.getList).toHaveBeenCalled();
    expect(component.results.length).toBe(2);
    expect(component.results[0].buildingName).toBe('A-Building'); // The list should be sorted by buildingName
  });
});
