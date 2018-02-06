import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RiskContributors } from './risk-contributors.model';
import { RiskContributorsService } from './risk-contributors.service';
import { Principal } from '../../shared';
import {Router} from "@angular/router";

@Component({
    selector: 'jhi-risk-contributors',
    templateUrl: './risk-contributors-custom.component.html'
})
export class RiskContributorsComponent implements OnInit, OnDestroy {
    riskContributors: RiskContributors[];
    currentAccount: any;
    eventSubscriber: Subscription;

    impactAttribute = {
      impactToBrand:    0,
      impactToCredibiity:   0,
      financialLoss:    0,
      complianceVoilation:  0,
      badPractices: 0,
      total:    0 
    };
    
    impactAttributeId = {
      impactToBrand:    0,
      impactToCredibiity:   0,
      financialLoss:    0,
      complianceVoilation:  0,
      badPractices: 0
    };
    
   updateTotal(){
    this.impactAttribute.total = this.impactAttribute.impactToBrand
    +this.impactAttribute.impactToCredibiity
    +this.impactAttribute.financialLoss
    +this.impactAttribute.complianceVoilation
    +this.impactAttribute.badPractices;
   }
    
  update(){
    console.log("Req to update the data");
    const data = [{
        id:this.impactAttributeId.impactToBrand,
        clientId:1500,
        riskContributors:"impactToBrand",
        weightage:this.impactAttribute.impactToBrand
    },
        {
        id:this.impactAttributeId.impactToCredibiity,
        clientId:1500,
        riskContributors:"impactToCredibiity",
        weightage:this.impactAttribute.impactToCredibiity
    },
        {
        id:this.impactAttributeId.financialLoss,
        clientId:1500,
        riskContributors:"financialLoss",
        weightage:this.impactAttribute.financialLoss
    },{
        id:this.impactAttributeId.complianceVoilation,
        clientId:1500,
        riskContributors:"complianceVoilation",
        weightage:this.impactAttribute.complianceVoilation
    },{
        id:this.impactAttributeId.badPractices,
        clientId:1500,
        riskContributors:"badPractices",
        weightage:this.impactAttribute.badPractices
    }];
    this.riskContributorsService.updateList(data).subscribe();
      
  }  
    
  cancel(){
     this.router.navigate(['']);
  }
     
    constructor(
        private riskContributorsService: RiskContributorsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router
    ) {
    }

    loadAll() {
        this.riskContributorsService.query().subscribe(
            (res: HttpResponse<RiskContributors[]>) => {
                this.riskContributors = res.body;
                for(var i=0; i<this.riskContributors.length;i++){
                    this.impactAttribute[this.riskContributors[i].riskContributors]=this.riskContributors[i].weightage;
                    this.impactAttributeId[this.riskContributors[i].riskContributors]=this.riskContributors[i].id;
                }
                this.updateTotal();
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
