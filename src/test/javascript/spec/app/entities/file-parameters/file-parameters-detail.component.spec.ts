/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FraudDetectionTestModule } from '../../../test.module';
import { FileParametersDetailComponent } from '../../../../../../main/webapp/app/entities/file-parameters/file-parameters-detail.component';
import { FileParametersService } from '../../../../../../main/webapp/app/entities/file-parameters/file-parameters.service';
import { FileParameters } from '../../../../../../main/webapp/app/entities/file-parameters/file-parameters.model';

describe('Component Tests', () => {

    describe('FileParameters Management Detail Component', () => {
        let comp: FileParametersDetailComponent;
        let fixture: ComponentFixture<FileParametersDetailComponent>;
        let service: FileParametersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FraudDetectionTestModule],
                declarations: [FileParametersDetailComponent],
                providers: [
                    FileParametersService
                ]
            })
            .overrideTemplate(FileParametersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FileParametersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FileParametersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FileParameters(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fileParameters).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
