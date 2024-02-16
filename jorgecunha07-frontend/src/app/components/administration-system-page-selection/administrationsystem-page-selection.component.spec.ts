import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdministrationsystemPageSelectionComponent } from './administrationsystem-page-selection.component';
import { AuthService } from "../../IService/services/auth.service";
import {Router} from "@angular/router";

describe('AdministrationsystemPageSelectionComponent', () => {
  let component: AdministrationsystemPageSelectionComponent;
  let fixture: ComponentFixture<AdministrationsystemPageSelectionComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['navigateTo']); // Replace 'someMethod' with actual methods used in your component

    TestBed.configureTestingModule({
      declarations: [ AdministrationsystemPageSelectionComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    });

    fixture = TestBed.createComponent(AdministrationsystemPageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize with correct module paths', () => {
    expect(component.module1Path).toEqual('/mbco');
    expect(component.module2Path).toEqual('/recuperacaodedados');
  });

  it('should navigate to the correct path when navigateTo is called', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.navigateTo(component.module1Path);
    expect(router.navigate).toHaveBeenCalledWith(['/mbco']);

    component.navigateTo(component.module2Path);
    expect(router.navigate).toHaveBeenCalledWith(['/recuperacaodedados']);
  });

  it('should call navigateTo with the correct path when a module card is clicked', () => {
    spyOn(component, 'navigateTo');
    const compiled = fixture.nativeElement;

    const module1Card = compiled.querySelector('.module-card:nth-child(1)');
    module1Card.click();
    expect(component.navigateTo).toHaveBeenCalledWith(component.module1Path);

    const module2Card = compiled.querySelector('.module-card:nth-child(2)');
    module2Card.click();
    expect(component.navigateTo).toHaveBeenCalledWith(component.module2Path);
  });


});

