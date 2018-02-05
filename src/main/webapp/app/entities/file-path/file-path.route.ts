import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FilePathComponent } from './file-path.component';
import { FilePathDetailComponent } from './file-path-detail.component';
import { FilePathPopupComponent } from './file-path-dialog.component';
import { FilePathDeletePopupComponent } from './file-path-delete-dialog.component';

export const filePathRoute: Routes = [
    {
        path: 'file-path',
        component: FilePathComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.filePath.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'file-path/:id',
        component: FilePathDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.filePath.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const filePathPopupRoute: Routes = [
    {
        path: 'file-path-new',
        component: FilePathPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.filePath.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'file-path/:id/edit',
        component: FilePathPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.filePath.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'file-path/:id/delete',
        component: FilePathDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.filePath.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
