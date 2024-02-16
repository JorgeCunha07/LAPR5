import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from "../../../IService/services/auth.service";
import {InformationPageRgpdComponent} from "./information-page-rgpd.component";

describe('InformationPageAboutusComponent', () => {
  let component: InformationPageRgpdComponent;
  let fixture: ComponentFixture<InformationPageRgpdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationPageRgpdComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule // Include if AuthService makes HTTP requests
      ],
      providers: [ AuthService ] // Provide a mock if AuthService is actively used
    });

    fixture = TestBed.createComponent(InformationPageRgpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
