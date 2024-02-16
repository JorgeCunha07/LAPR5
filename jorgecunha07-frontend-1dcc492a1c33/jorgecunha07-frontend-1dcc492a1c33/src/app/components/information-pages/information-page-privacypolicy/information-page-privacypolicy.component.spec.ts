import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // If AuthService makes HTTP requests
import { AuthService } from "../../../IService/services/auth.service";
import {InformationPagePrivacypolicyComponent} from "./information-page-privacypolicy.component";

describe('InformationPagePrivacypolicyComponent', () => {
  let component: InformationPagePrivacypolicyComponent;
  let fixture: ComponentFixture<InformationPagePrivacypolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationPagePrivacypolicyComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [ AuthService ]
    });

    fixture = TestBed.createComponent(InformationPagePrivacypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
