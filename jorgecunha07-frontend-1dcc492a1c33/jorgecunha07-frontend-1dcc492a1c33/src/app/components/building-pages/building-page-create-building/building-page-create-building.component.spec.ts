import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { BuildingPageCreateBuildingComponent } from './building-page-create-building.component';
import { AuthService } from "../../../IService/services/auth.service";
import { BuildingService } from "../../../IService/services/building.service";
import { of } from 'rxjs';

describe('BuildingPageCreateBuildingComponent', () => {
  let component: BuildingPageCreateBuildingComponent;
  let fixture: ComponentFixture<BuildingPageCreateBuildingComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockBuildingService: jasmine.SpyObj<BuildingService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['someMethod']);
    mockBuildingService = jasmine.createSpyObj('BuildingService', ['createBuilding']);

    TestBed.configureTestingModule({
      declarations: [ BuildingPageCreateBuildingComponent ],
      imports: [ FormsModule, HttpClientTestingModule ], // Include HttpClientTestingModule here
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: BuildingService, useValue: mockBuildingService }
      ]
    });

    fixture = TestBed.createComponent(BuildingPageCreateBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




});

