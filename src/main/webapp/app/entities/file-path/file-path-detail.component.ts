import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FilePath } from './file-path.model';
import { FilePathService } from './file-path.service';

@Component({
    selector: 'jhi-file-path-detail',
    templateUrl: './file-path-detail.component.html'
})
export class FilePathDetailComponent implements OnInit, OnDestroy {

    filePath: FilePath;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private filePathService: FilePathService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFilePaths();
    }

    load(id) {
        this.filePathService.find(id)
            .subscribe((filePathResponse: HttpResponse<FilePath>) => {
                this.filePath = filePathResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFilePaths() {
        this.eventSubscriber = this.eventManager.subscribe(
            'filePathListModification',
            (response) => this.load(this.filePath.id)
        );
    }
}
