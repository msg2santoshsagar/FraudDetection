import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FileParameters } from './file-parameters.model';
import { FileParametersService } from './file-parameters.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-file-parameters',
    templateUrl: './file-parameters.component.html'
})
export class FileParametersComponent implements OnInit, OnDestroy {
fileParameters: FileParameters[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private fileParametersService: FileParametersService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.fileParametersService.query().subscribe(
            (res: HttpResponse<FileParameters[]>) => {
                this.fileParameters = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFileParameters();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FileParameters) {
        return item.id;
    }
    registerChangeInFileParameters() {
        this.eventSubscriber = this.eventManager.subscribe('fileParametersListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
