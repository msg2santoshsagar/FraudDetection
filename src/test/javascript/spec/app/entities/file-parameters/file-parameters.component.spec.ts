/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FraudDetectionTestModule } from '../../../test.module';
import { FileParametersComponent } from '../../../../../../main/webapp/app/entities/file-parameters/file-parameters.component';
import { FileParametersService } from '../../../../../../main/webapp/app/entities/file-parameters/file-parameters.service';
import { FileParameters } from '../../../../../../main/webapp/app/entities/file-parameters/file-parameters.model';

describe('Component Tests', () => {

    describe('FileParameters Management Component', () => {
        let comp: FileParametersComponent;
        let fixture: ComponentFixture<FileParametersComponent>;
        let service: FileParametersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FraudDetectionTestModule],
                declarations: [FileParametersComponent],
                providers: [
                    FileParametersService
                ]
            })
            .overrideTemplate(FileParametersComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FileParametersComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FileParametersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FileParameters(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fileParameters[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
