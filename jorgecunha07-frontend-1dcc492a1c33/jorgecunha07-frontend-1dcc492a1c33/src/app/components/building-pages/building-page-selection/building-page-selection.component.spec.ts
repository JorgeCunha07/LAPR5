import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildingPageSelectionComponent } from './building-page-selection.component';
import { AuthService } from "../../../IService/services/auth.service";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('BuildingPageSelectionComponent', () => {
  let component: BuildingPageSelectionComponent;
  let fixture: ComponentFixture<BuildingPageSelectionComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingPageSelectionComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ], // Include HttpClientTestingModule here
      providers: [ AuthService ]
    });

    fixture = TestBed.createComponent(BuildingPageSelectionComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to correct route on navigateToPage', () => {
    const buttonTestData = [
      { buttonIndex: 1, expectedRoute: 'gestaodocampus/buildings/CreateBuilding' },
      { buttonIndex: 2, expectedRoute: 'gestaodocampus/buildings/EditBuilding' },
      { buttonIndex: 3, expectedRoute: 'gestaodocampus/buildings/FindAllBuildings' },
      { buttonIndex: 4, expectedRoute: 'gestaodocampus/buildings/FindAllBuildingsByParameter' },
      { buttonIndex: 5, expectedRoute: 'gestaodocampus' },
    ];

    buttonTestData.forEach(testData => {
      component.navigateToPage(testData.buttonIndex);
      expect(router.navigate).toHaveBeenCalledWith([testData.expectedRoute]);
    });
  });

  it('should navigate to the correct route when buttons are clicked', () => {
    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('.button-container button');

    buttons[0].click();
    expect(router.navigate).toHaveBeenCalledWith(['gestaodocampus/buildings/CreateBuilding']);

    buttons[1].click();
    expect(router.navigate).toHaveBeenCalledWith(['gestaodocampus/buildings/EditBuilding']);

    buttons[2].click();
    expect(router.navigate).toHaveBeenCalledWith(['gestaodocampus/buildings/FindAllBuildings']);

    buttons[3].click();
    expect(router.navigate).toHaveBeenCalledWith(['gestaodocampus/buildings/FindAllBuildingsByParameter']);

    buttons[4].click();
    expect(router.navigate).toHaveBeenCalledWith(['gestaodocampus']);
  });



  it('should have correct text on buttons', () => {
    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('.button-container button');
    expect(buttons[0].textContent).toContain('Create Building');
    expect(buttons[1].textContent).toContain('Edit Building');
    expect(buttons[2].textContent).toContain('View All Buildings');
    expect(buttons[3].textContent).toContain('Find Building by Parameter');
    expect(buttons[4].textContent).toContain('Go Back');
  });

  it('should have four buttons for navigation', () => {
    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('.button-container button');
    expect(buttons.length).toBe(5);
  });



});
