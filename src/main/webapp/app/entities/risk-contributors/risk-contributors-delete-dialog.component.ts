import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RiskContributors } from './risk-contributors.model';
import { RiskContributorsPopupService } from './risk-contributors-popup.service';
import { RiskContributorsService } from './risk-contributors.service';

@Component({
    selector: 'jhi-risk-contributors-delete-dialog',
    templateUrl: './risk-contributors-delete-dialog.component.html'
})
export class RiskContributorsDeleteDialogComponent {

    riskContributors: RiskContributors;

    constructor(
        private riskContributorsService: RiskContributorsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.riskContributorsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'riskContributorsListModification',
                content: 'Deleted an riskContributors'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-risk-contributors-delete-popup',
    template: ''
})
export class RiskContributorsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private riskContributorsPopupService: RiskContributorsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.riskContributorsPopupService
                .open(RiskContributorsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
