import { BaseEntity } from './../../shared';

export class RiskContributors implements BaseEntity {
    constructor(
        public id?: number,
        public clientId?: number,
        public riskContributors?: string,
        public description?: string,
        public weightage?: number,
        public deleteFlag?: string,
    ) {
    }
}
