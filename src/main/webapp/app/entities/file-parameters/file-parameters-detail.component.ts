import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FileParameters } from './file-parameters.model';
import { FileParametersService } from './file-parameters.service';

@Component({
    selector: 'jhi-file-parameters-detail',
    templateUrl: './file-parameters-detail.component.html'
})
export class FileParametersDetailComponent implements OnInit, OnDestroy {

    fileParameters: FileParameters;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private fileParametersService: FileParametersService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFileParameters();
    }

    load(id) {
        this.fileParametersService.find(id)
            .subscribe((fileParametersResponse: HttpResponse<FileParameters>) => {
                this.fileParameters = fileParametersResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFileParameters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fileParametersListModification',
            (response) => this.load(this.fileParameters.id)
        );
    }
}
