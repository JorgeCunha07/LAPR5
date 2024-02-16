import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FloorPageSelectionComponent } from './floor-page-selection.component';
import { AuthService } from '../../../IService/services/auth.service';

// Mock AuthService
class MockAuthService {}

describe('FloorPageSelectionComponent', () => {
    let component: FloorPageSelectionComponent;
    let fixture: ComponentFixture<FloorPageSelectionComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ FloorPageSelectionComponent ],
            imports: [ RouterTestingModule ],
            providers: [
                { provide: AuthService, useClass: MockAuthService }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FloorPageSelectionComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('navigateToPage', () => {
        it('should navigate to CreateFloor on case 1', () => {
            const navigateSpy = spyOn(router, 'navigate');
            component.navigateToPage(1);
            expect(navigateSpy).toHaveBeenCalledWith(['gestaodocampus/floors/CreateFloor']);
        });

        it('should navigate to UpdateFloor on case 2', () => {
            const navigateSpy = spyOn(router, 'navigate');
            component.navigateToPage(2);
            expect(navigateSpy).toHaveBeenCalledWith(['gestaodocampus/floors/UpdateFloor']);
        });

        it('should navigate to UpdateFloorMap on case 3', () => {
            const navigateSpy = spyOn(router, 'navigate');
            component.navigateToPage(3);
            expect(navigateSpy).toHaveBeenCalledWith(['gestaodocampus/floors/UpdateFloorMap']);
        });

        it('should not navigate on default case', () => {
            const navigateSpy = spyOn(router, 'navigate');
            component.navigateToPage(99); // Assuming 99 is not a valid case
            expect(navigateSpy).not.toHaveBeenCalled();
        });
    });
});
