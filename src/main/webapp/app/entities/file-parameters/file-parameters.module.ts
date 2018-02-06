import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FraudDetectionSharedModule } from '../../shared';
import {
    FileParametersService,
    FileParametersPopupService,
    FileParametersComponent,
    FileParametersDetailComponent,
    FileParametersDialogComponent,
    FileParametersPopupComponent,
    FileParametersDeletePopupComponent,
    FileParametersDeleteDialogComponent,
    fileParametersRoute,
    fileParametersPopupRoute,
} from './';

const ENTITY_STATES = [
    ...fileParametersRoute,
    ...fileParametersPopupRoute,
];

@NgModule({
    imports: [
        FraudDetectionSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FileParametersComponent,
        FileParametersDetailComponent,
        FileParametersDialogComponent,
        FileParametersDeleteDialogComponent,
        FileParametersPopupComponent,
        FileParametersDeletePopupComponent,
    ],
    entryComponents: [
        FileParametersComponent,
        FileParametersDialogComponent,
        FileParametersPopupComponent,
        FileParametersDeleteDialogComponent,
        FileParametersDeletePopupComponent,
    ],
    providers: [
        FileParametersService,
        FileParametersPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FraudDetectionFileParametersModule {}
