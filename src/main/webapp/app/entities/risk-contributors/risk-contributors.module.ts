import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FraudDetectionSharedModule } from '../../shared';
import {
    RiskContributorsService,
    RiskContributorsPopupService,
    RiskContributorsComponent,
    RiskContributorsDetailComponent,
    RiskContributorsDialogComponent,
    RiskContributorsPopupComponent,
    RiskContributorsDeletePopupComponent,
    RiskContributorsDeleteDialogComponent,
    riskContributorsRoute,
    riskContributorsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...riskContributorsRoute,
    ...riskContributorsPopupRoute,
];

@NgModule({
    imports: [
        FraudDetectionSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RiskContributorsComponent,
        RiskContributorsDetailComponent,
        RiskContributorsDialogComponent,
        RiskContributorsDeleteDialogComponent,
        RiskContributorsPopupComponent,
        RiskContributorsDeletePopupComponent,
    ],
    entryComponents: [
        RiskContributorsComponent,
        RiskContributorsDialogComponent,
        RiskContributorsPopupComponent,
        RiskContributorsDeleteDialogComponent,
        RiskContributorsDeletePopupComponent,
    ],
    providers: [
        RiskContributorsService,
        RiskContributorsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FraudDetectionRiskContributorsModule {}
