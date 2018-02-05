import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FilePath } from './file-path.model';
import { FilePathPopupService } from './file-path-popup.service';
import { FilePathService } from './file-path.service';

@Component({
    selector: 'jhi-file-path-delete-dialog',
    templateUrl: './file-path-delete-dialog.component.html'
})
export class FilePathDeleteDialogComponent {

    filePath: FilePath;

    constructor(
        private filePathService: FilePathService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.filePathService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'filePathListModification',
                content: 'Deleted an filePath'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-file-path-delete-popup',
    template: ''
})
export class FilePathDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private filePathPopupService: FilePathPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.filePathPopupService
                .open(FilePathDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
