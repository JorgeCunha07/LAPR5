import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from "../../../IService/services/auth.service";
import {InformationPageSelectionComponent} from "./information-page-selection.component";

describe('InformationPageSelectionComponent', () => {
  let component: InformationPageSelectionComponent;
  let fixture: ComponentFixture<InformationPageSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationPageSelectionComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule // Include if AuthService makes HTTP requests
      ],
      providers: [ AuthService ] // Provide a mock if AuthService is actively used
    });

    fixture = TestBed.createComponent(InformationPageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
