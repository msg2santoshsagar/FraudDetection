/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FraudDetectionTestModule } from '../../../test.module';
import { FilePathDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/file-path/file-path-delete-dialog.component';
import { FilePathService } from '../../../../../../main/webapp/app/entities/file-path/file-path.service';

describe('Component Tests', () => {

    describe('FilePath Management Delete Component', () => {
        let comp: FilePathDeleteDialogComponent;
        let fixture: ComponentFixture<FilePathDeleteDialogComponent>;
        let service: FilePathService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FraudDetectionTestModule],
                declarations: [FilePathDeleteDialogComponent],
                providers: [
                    FilePathService
                ]
            })
            .overrideTemplate(FilePathDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FilePathDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FilePathService);
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
