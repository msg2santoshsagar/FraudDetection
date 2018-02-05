import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FilePath } from './file-path.model';
import { FilePathPopupService } from './file-path-popup.service';
import { FilePathService } from './file-path.service';

@Component({
    selector: 'jhi-file-path-dialog',
    templateUrl: './file-path-dialog.component.html'
})
export class FilePathDialogComponent implements OnInit {

    filePath: FilePath;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private filePathService: FilePathService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.filePath.id !== undefined) {
            this.subscribeToSaveResponse(
                this.filePathService.update(this.filePath));
        } else {
            this.subscribeToSaveResponse(
                this.filePathService.create(this.filePath));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FilePath>>) {
        result.subscribe((res: HttpResponse<FilePath>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FilePath) {
        this.eventManager.broadcast({ name: 'filePathListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-file-path-popup',
    template: ''
})
export class FilePathPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private filePathPopupService: FilePathPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.filePathPopupService
                    .open(FilePathDialogComponent as Component, params['id']);
            } else {
                this.filePathPopupService
                    .open(FilePathDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
