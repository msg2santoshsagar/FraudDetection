import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FileParametersComponent } from './file-parameters.component';
import { FileParametersDetailComponent } from './file-parameters-detail.component';
import { FileParametersPopupComponent } from './file-parameters-dialog.component';
import { FileParametersDeletePopupComponent } from './file-parameters-delete-dialog.component';

export const fileParametersRoute: Routes = [
    {
        path: 'file-parameters',
        component: FileParametersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.fileParameters.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'file-parameters/:id',
        component: FileParametersDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.fileParameters.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fileParametersPopupRoute: Routes = [
    {
        path: 'file-parameters-new',
        component: FileParametersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.fileParameters.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'file-parameters/:id/edit',
        component: FileParametersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.fileParameters.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'file-parameters/:id/delete',
        component: FileParametersDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.fileParameters.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
