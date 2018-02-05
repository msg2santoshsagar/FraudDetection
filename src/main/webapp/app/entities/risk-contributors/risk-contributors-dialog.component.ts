import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RiskContributors } from './risk-contributors.model';
import { RiskContributorsPopupService } from './risk-contributors-popup.service';
import { RiskContributorsService } from './risk-contributors.service';

@Component({
    selector: 'jhi-risk-contributors-dialog',
    templateUrl: './risk-contributors-dialog.component.html'
})
export class RiskContributorsDialogComponent implements OnInit {

    riskContributors: RiskContributors;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private riskContributorsService: RiskContributorsService,
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
        if (this.riskContributors.id !== undefined) {
            this.subscribeToSaveResponse(
                this.riskContributorsService.update(this.riskContributors));
        } else {
            this.subscribeToSaveResponse(
                this.riskContributorsService.create(this.riskContributors));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RiskContributors>>) {
        result.subscribe((res: HttpResponse<RiskContributors>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RiskContributors) {
        this.eventManager.broadcast({ name: 'riskContributorsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-risk-contributors-popup',
    template: ''
})
export class RiskContributorsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private riskContributorsPopupService: RiskContributorsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.riskContributorsPopupService
                    .open(RiskContributorsDialogComponent as Component, params['id']);
            } else {
                this.riskContributorsPopupService
                    .open(RiskContributorsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
