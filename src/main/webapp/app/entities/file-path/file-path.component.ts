import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FilePath } from './file-path.model';
import { FilePathService } from './file-path.service';
import { FileParametersService } from '../file-parameters/file-parameters.service';
import { Principal } from '../../shared';
import { FileParameters } from '../file-parameters';

@Component({
    selector: 'jhi-file-path',
    templateUrl: './file-path-custom.component.html'
})
export class FilePathComponent implements OnInit, OnDestroy {
	
    filePaths: FilePath[];
    fileParamsList : FileParameters[]
    currentAccount: any;
    eventSubscriber: Subscription;
    selectedFileParam:null

    constructor(
        private filePathService: FilePathService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private fileParameterService: FileParametersService

    ) {
    }

    loadAll() {
        this.fileParameterService.query().subscribe(
            (res : HttpResponse<FileParameters[]>) => {
                this.fileParamsList = res.body;
            },
            (res : HttpErrorResponse) => this.onError(res.message)
        );
        
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
    
    browse(){
        console.log("Request to browse");
    }

    selectFileParam(fileParamName){
        console.log("Request to select file param name -- ",fileParamName);
        this.selectedFileParam = fileParamName;
    }
}
