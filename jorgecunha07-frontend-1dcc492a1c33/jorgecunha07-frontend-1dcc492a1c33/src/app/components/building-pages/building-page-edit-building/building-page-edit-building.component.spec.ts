import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingService } from "../../../IService/services/building.service";
import BuildingDTO from "../../../dto/BuildingDTO";
import { AuthService } from "../../../IService/services/auth.service";
import { BuildingPageEditBuildingComponent } from './building-page-edit-building.component';
import { of, throwError } from 'rxjs';

describe('BuildingPageEditBuildingComponent', () => {
    let component: BuildingPageEditBuildingComponent;
    let fixture: ComponentFixture<BuildingPageEditBuildingComponent>;

    // Mock services and dependencies
    const authServiceMock = {
        // Mock authService methods and properties if needed
    };

    const buildingServiceMock = {
        getList: () => of([] as BuildingDTO[]), // Mock the behavior of buildingService.getList()
        getBuildingByCode: (code: string) => of({} as BuildingDTO), // Mock the behavior of buildingService.getBuildingByCode()
        updateBuilding: (building: BuildingDTO) => of(building), // Mock the behavior of buildingService.updateBuilding()
    };

    const routeMock = {
        snapshot: {
            paramMap: {
                get: (param: string) => 'sampleCode', // Mock the behavior of route.snapshot.paramMap.get()
            },
        },
    };

    const routerMock = {
        // Mock router methods and properties if needed
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BuildingPageEditBuildingComponent],
            providers: [
                { provide: ActivatedRoute, useValue: routeMock },
                { provide: Router, useValue: routerMock },
                { provide: AuthService, useValue: authServiceMock },
                { provide: BuildingService, useValue: buildingServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BuildingPageEditBuildingComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load buildings on init', () => {
        spyOn(buildingServiceMock, 'getList').and.returnValue(of([] as BuildingDTO[]));

        component.ngOnInit();

        expect(buildingServiceMock.getList).toHaveBeenCalled();
        expect(component.listBuildings).toEqual([]); // Check if listBuildings is empty
    });

    it('should get a building by code', () => {
        spyOn(buildingServiceMock, 'getBuildingByCode').and.returnValue(of({} as BuildingDTO));

        component.onSelectBuilding('sampleCode'); // Pass a sample code

        expect(buildingServiceMock.getBuildingByCode).toHaveBeenCalledWith('sampleCode');
        expect(component.building).toEqual({} as BuildingDTO);
    });


    it('should update a building', () => {
        spyOn(buildingServiceMock, 'updateBuilding').and.returnValue(of({} as BuildingDTO));

        component.building.buildingCode = 'sampleCode'; // Set a building code
        component.updateBuilding();

        expect(buildingServiceMock.updateBuilding).toHaveBeenCalledWith(component.building);
        expect(component.successMessage).toEqual('Building updated successfully');
    });



    // Add more test cases as needed

    // Clean up after each test
    afterEach(() => {
        fixture.destroy();
    });
});
