import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RiskContributorsComponent } from './risk-contributors.component';
import { RiskContributorsDetailComponent } from './risk-contributors-detail.component';
import { RiskContributorsPopupComponent } from './risk-contributors-dialog.component';
import { RiskContributorsDeletePopupComponent } from './risk-contributors-delete-dialog.component';

export const riskContributorsRoute: Routes = [
    {
        path: 'risk-contributors',
        component: RiskContributorsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.riskContributors.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'risk-contributors/:id',
        component: RiskContributorsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.riskContributors.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const riskContributorsPopupRoute: Routes = [
    {
        path: 'risk-contributors-new',
        component: RiskContributorsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.riskContributors.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'risk-contributors/:id/edit',
        component: RiskContributorsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.riskContributors.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'risk-contributors/:id/delete',
        component: RiskContributorsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fraudDetectionApp.riskContributors.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
