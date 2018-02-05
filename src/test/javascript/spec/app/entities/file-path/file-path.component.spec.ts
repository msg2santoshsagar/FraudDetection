/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FraudDetectionTestModule } from '../../../test.module';
import { FilePathComponent } from '../../../../../../main/webapp/app/entities/file-path/file-path.component';
import { FilePathService } from '../../../../../../main/webapp/app/entities/file-path/file-path.service';
import { FilePath } from '../../../../../../main/webapp/app/entities/file-path/file-path.model';

describe('Component Tests', () => {

    describe('FilePath Management Component', () => {
        let comp: FilePathComponent;
        let fixture: ComponentFixture<FilePathComponent>;
        let service: FilePathService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FraudDetectionTestModule],
                declarations: [FilePathComponent],
                providers: [
                    FilePathService
                ]
            })
            .overrideTemplate(FilePathComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FilePathComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FilePathService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FilePath(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.filePaths[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
