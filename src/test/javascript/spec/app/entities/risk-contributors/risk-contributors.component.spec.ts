/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FraudDetectionTestModule } from '../../../test.module';
import { RiskContributorsComponent } from '../../../../../../main/webapp/app/entities/risk-contributors/risk-contributors.component';
import { RiskContributorsService } from '../../../../../../main/webapp/app/entities/risk-contributors/risk-contributors.service';
import { RiskContributors } from '../../../../../../main/webapp/app/entities/risk-contributors/risk-contributors.model';

describe('Component Tests', () => {

    describe('RiskContributors Management Component', () => {
        let comp: RiskContributorsComponent;
        let fixture: ComponentFixture<RiskContributorsComponent>;
        let service: RiskContributorsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FraudDetectionTestModule],
                declarations: [RiskContributorsComponent],
                providers: [
                    RiskContributorsService
                ]
            })
            .overrideTemplate(RiskContributorsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RiskContributorsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RiskContributorsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RiskContributors(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.riskContributors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
