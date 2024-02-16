import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // If AuthService makes HTTP requests
import { AuthService } from "../../../IService/services/auth.service";
import { InformationPageAboutusComponent } from './information-page-aboutus.component';

describe('InformationPageAboutusComponent', () => {
  let component: InformationPageAboutusComponent;
  let fixture: ComponentFixture<InformationPageAboutusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationPageAboutusComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule // Include if AuthService makes HTTP requests
      ],
      providers: [ AuthService ] // Provide a mock if AuthService is actively used
    });

    fixture = TestBed.createComponent(InformationPageAboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
