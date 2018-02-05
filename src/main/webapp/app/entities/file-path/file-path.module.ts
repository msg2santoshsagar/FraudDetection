import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FraudDetectionSharedModule } from '../../shared';
import {
    FilePathService,
    FilePathPopupService,
    FilePathComponent,
    FilePathDetailComponent,
    FilePathDialogComponent,
    FilePathPopupComponent,
    FilePathDeletePopupComponent,
    FilePathDeleteDialogComponent,
    filePathRoute,
    filePathPopupRoute,
} from './';

const ENTITY_STATES = [
    ...filePathRoute,
    ...filePathPopupRoute,
];

@NgModule({
    imports: [
        FraudDetectionSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FilePathComponent,
        FilePathDetailComponent,
        FilePathDialogComponent,
        FilePathDeleteDialogComponent,
        FilePathPopupComponent,
        FilePathDeletePopupComponent,
    ],
    entryComponents: [
        FilePathComponent,
        FilePathDialogComponent,
        FilePathPopupComponent,
        FilePathDeleteDialogComponent,
        FilePathDeletePopupComponent,
    ],
    providers: [
        FilePathService,
        FilePathPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FraudDetectionFilePathModule {}
