import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FilePath } from './file-path.model';
import { FilePathService } from './file-path.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-file-path',
    templateUrl: './file-path-custom.component.html'
})
export class FilePathComponent implements OnInit, OnDestroy {
	
	filePaths: FilePath[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private filePathService: FilePathService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.filePathService.query().subscribe(
            (res: HttpResponse<FilePath[]>) => {
                this.filePaths = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFilePaths();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FilePath) {
        return item.id;
    }
    registerChangeInFilePaths() {
        this.eventSubscriber = this.eventManager.subscribe('filePathListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
    
    selectNewFolder(){
    }
}
