import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RiskContributors } from './risk-contributors.model';
import { RiskContributorsService } from './risk-contributors.service';

@Injectable()
export class RiskContributorsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private riskContributorsService: RiskContributorsService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.riskContributorsService.find(id)
                    .subscribe((riskContributorsResponse: HttpResponse<RiskContributors>) => {
                        const riskContributors: RiskContributors = riskContributorsResponse.body;
                        this.ngbModalRef = this.riskContributorsModalRef(component, riskContributors);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.riskContributorsModalRef(component, new RiskContributors());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    riskContributorsModalRef(component: Component, riskContributors: RiskContributors): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.riskContributors = riskContributors;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
