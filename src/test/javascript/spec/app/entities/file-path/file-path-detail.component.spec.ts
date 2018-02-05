/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FraudDetectionTestModule } from '../../../test.module';
import { FilePathDetailComponent } from '../../../../../../main/webapp/app/entities/file-path/file-path-detail.component';
import { FilePathService } from '../../../../../../main/webapp/app/entities/file-path/file-path.service';
import { FilePath } from '../../../../../../main/webapp/app/entities/file-path/file-path.model';

describe('Component Tests', () => {

    describe('FilePath Management Detail Component', () => {
        let comp: FilePathDetailComponent;
        let fixture: ComponentFixture<FilePathDetailComponent>;
        let service: FilePathService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FraudDetectionTestModule],
                declarations: [FilePathDetailComponent],
                providers: [
                    FilePathService
                ]
            })
            .overrideTemplate(FilePathDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FilePathDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FilePathService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FilePath(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.filePath).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
