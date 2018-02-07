import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FilePath } from './file-path.model';
import { FilePathService } from './file-path.service';
import { FileParametersService } from '../file-parameters/file-parameters.service';
import { Principal } from '../../shared';
import { FileParameters } from '../file-parameters';
import { Router} from "@angular/router";

@Component({
    selector: 'jhi-file-path',
    templateUrl: './file-path-custom.component.html'
})
export class FilePathComponent implements OnInit, OnDestroy {
	filePaths: FilePath[];
    fileParamsList : FileParameters[]
    currentAccount: string;
    eventSubscriber: Subscription;
    selectedFileParam:null

    constructor(
        private filePathService: FilePathService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private fileParameterService: FileParametersService,
        private router: Router

    ) { }

    loadAll() {
        this.fileParameterService.query().subscribe(
            (res : HttpResponse<FileParameters[]>) => {
                this.fileParamsList = res.body;

                this.filePathService.query().subscribe(
                    (res: HttpResponse<FilePath[]>) => {
                        //this.filePaths = res.body;
                        this.filePaths = [];
                        var filePathsList = res.body;

                        for(var i= 0; i < this.fileParamsList.length;i++){

                            let isFound : boolean = false;

                            for(var j = 0; j< filePathsList.length; j++ ){
                                if( filePathsList[j].fileParam === this.fileParamsList[i].name ){
                                    isFound = true;
                                    this.filePaths.push(filePathsList[i]);
                                }
                            }

                            if(!isFound){
                                var fileParam = {
                                    clientId:1500,
                                    fileParam:this.fileParamsList[i].name,
                                    fileName:""
                                };
                                this.filePaths.push(fileParam);
                            }

                        }




                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );  


            },
            (res : HttpErrorResponse) => this.onError(res.message)
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
        var filePathList = this.filePaths;
        var selectedFileParam = this.selectedFileParam;
        console.log("Request to browse");
        var input = document.createElement('input');
        input.type = "file";
        input.accept = "*";
        input.style.visibility = "hidden";
        document.body.appendChild(input);
        input.onchange = function () {
            var files = input.files;
            var file = files[0];
            const fileName = file.name;
            for(var i =0;  i < filePathList.length; i++ ){
                if(filePathList[i].fileParam === selectedFileParam ){
                    console.log("File path list matched");
                    filePathList[i].fileName = fileName;
                }
            }
            console.log("Updated File Path list is -- ",filePathList);
            document.body.removeChild(input);
        }
        input.click();
    }

    selectFileParam(fileParamName){
        console.log("Request to select file param name -- ",fileParamName);
        this.selectedFileParam = fileParamName;
    }

    cancel(){
        this.router.navigate(['']);
     }

     save(){
         console.log("Request to save the file path");
         this.filePathService.updateList(this.filePaths).subscribe(
             (res : any)=>{
                 console.log("FIle Path data saved --- ",res);
             },
             (res: HttpErrorResponse) => this.onError(res.message)
         )
     } 

}
