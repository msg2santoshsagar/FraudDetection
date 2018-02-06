import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FileParameters } from './file-parameters.model';
import { FileParametersPopupService } from './file-parameters-popup.service';
import { FileParametersService } from './file-parameters.service';

@Component({
    selector: 'jhi-file-parameters-delete-dialog',
    templateUrl: './file-parameters-delete-dialog.component.html'
})
export class FileParametersDeleteDialogComponent {

    fileParameters: FileParameters;

    constructor(
        private fileParametersService: FileParametersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fileParametersService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fileParametersListModification',
                content: 'Deleted an fileParameters'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-file-parameters-delete-popup',
    template: ''
})
export class FileParametersDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fileParametersPopupService: FileParametersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fileParametersPopupService
                .open(FileParametersDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
