import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FileParameters } from './file-parameters.model';
import { FileParametersPopupService } from './file-parameters-popup.service';
import { FileParametersService } from './file-parameters.service';

@Component({
    selector: 'jhi-file-parameters-dialog',
    templateUrl: './file-parameters-dialog.component.html'
})
export class FileParametersDialogComponent implements OnInit {

    fileParameters: FileParameters;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private fileParametersService: FileParametersService,
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
        if (this.fileParameters.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fileParametersService.update(this.fileParameters));
        } else {
            this.subscribeToSaveResponse(
                this.fileParametersService.create(this.fileParameters));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FileParameters>>) {
        result.subscribe((res: HttpResponse<FileParameters>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FileParameters) {
        this.eventManager.broadcast({ name: 'fileParametersListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-file-parameters-popup',
    template: ''
})
export class FileParametersPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fileParametersPopupService: FileParametersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fileParametersPopupService
                    .open(FileParametersDialogComponent as Component, params['id']);
            } else {
                this.fileParametersPopupService
                    .open(FileParametersDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
