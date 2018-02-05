/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FraudDetectionTestModule } from '../../../test.module';
import { RiskContributorsDetailComponent } from '../../../../../../main/webapp/app/entities/risk-contributors/risk-contributors-detail.component';
import { RiskContributorsService } from '../../../../../../main/webapp/app/entities/risk-contributors/risk-contributors.service';
import { RiskContributors } from '../../../../../../main/webapp/app/entities/risk-contributors/risk-contributors.model';

describe('Component Tests', () => {

    describe('RiskContributors Management Detail Component', () => {
        let comp: RiskContributorsDetailComponent;
        let fixture: ComponentFixture<RiskContributorsDetailComponent>;
        let service: RiskContributorsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FraudDetectionTestModule],
                declarations: [RiskContributorsDetailComponent],
                providers: [
                    RiskContributorsService
                ]
            })
            .overrideTemplate(RiskContributorsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RiskContributorsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RiskContributorsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RiskContributors(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.riskContributors).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
