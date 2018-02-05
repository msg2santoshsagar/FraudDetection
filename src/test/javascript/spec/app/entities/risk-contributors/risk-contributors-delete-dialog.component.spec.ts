/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FraudDetectionTestModule } from '../../../test.module';
import { RiskContributorsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/risk-contributors/risk-contributors-delete-dialog.component';
import { RiskContributorsService } from '../../../../../../main/webapp/app/entities/risk-contributors/risk-contributors.service';

describe('Component Tests', () => {

    describe('RiskContributors Management Delete Component', () => {
        let comp: RiskContributorsDeleteDialogComponent;
        let fixture: ComponentFixture<RiskContributorsDeleteDialogComponent>;
        let service: RiskContributorsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FraudDetectionTestModule],
                declarations: [RiskContributorsDeleteDialogComponent],
                providers: [
                    RiskContributorsService
                ]
            })
            .overrideTemplate(RiskContributorsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RiskContributorsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RiskContributorsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
