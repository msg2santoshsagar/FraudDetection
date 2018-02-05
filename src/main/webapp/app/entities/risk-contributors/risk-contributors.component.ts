import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RiskContributors } from './risk-contributors.model';
import { RiskContributorsService } from './risk-contributors.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-risk-contributors',
    templateUrl: './risk-contributors.component.html'
})
export class RiskContributorsComponent implements OnInit, OnDestroy {
riskContributors: RiskContributors[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private riskContributorsService: RiskContributorsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.riskContributorsService.query().subscribe(
            (res: HttpResponse<RiskContributors[]>) => {
                this.riskContributors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRiskContributors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RiskContributors) {
        return item.id;
    }
    registerChangeInRiskContributors() {
        this.eventSubscriber = this.eventManager.subscribe('riskContributorsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}