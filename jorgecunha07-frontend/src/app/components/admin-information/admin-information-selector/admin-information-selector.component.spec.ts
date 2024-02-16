import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { AdminInformationSelectorComponent } from './admin-information-selector.component';
import { RouterTestingModule } from '@angular/router/testing';
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AdminInformationSelectorComponent', () => {
  let component: AdminInformationSelectorComponent;
  let fixture: ComponentFixture<AdminInformationSelectorComponent>;
  let mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule], // Include RouterTestingModule
      declarations: [AdminInformationSelectorComponent],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInformationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to Create Users on navigateToPage(1)', () => {
    component.navigateToPage(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['AdminInformation/CreateUsers']);
  });

  it('should navigate to Approve Users on navigateToPage(2)', () => {
    component.navigateToPage(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['AdminInformation/ApproveUsers']);
  });

  it('should navigate to Modules on navigateToPage(4)', () => {
    component.navigateToPage(4);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['modules']);
  });

  it('should handle unknown page number in navigateToPage', () => {
    component.navigateToPage(999);
  });
});
