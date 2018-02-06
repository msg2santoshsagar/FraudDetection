import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FraudDetectionFilePathModule } from './file-path/file-path.module';
import { FraudDetectionRiskContributorsModule } from './risk-contributors/risk-contributors.module';
import { FraudDetectionFileParametersModule } from './file-parameters/file-parameters.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        FraudDetectionFilePathModule,
        FraudDetectionRiskContributorsModule,
        FraudDetectionFileParametersModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FraudDetectionEntityModule {}
