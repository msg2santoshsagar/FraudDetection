import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RiskContributors } from './risk-contributors.model';
import { RiskContributorsService } from './risk-contributors.service';

@Component({
    selector: 'jhi-risk-contributors-detail',
    templateUrl: './risk-contributors-detail.component.html'
})
export class RiskContributorsDetailComponent implements OnInit, OnDestroy {

    riskContributors: RiskContributors;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private riskContributorsService: RiskContributorsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRiskContributors();
    }

    load(id) {
        this.riskContributorsService.find(id)
            .subscribe((riskContributorsResponse: HttpResponse<RiskContributors>) => {
                this.riskContributors = riskContributorsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRiskContributors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'riskContributorsListModification',
            (response) => this.load(this.riskContributors.id)
        );
    }
}
