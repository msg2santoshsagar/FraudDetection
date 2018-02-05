import { BaseEntity } from './../../shared';

export class FilePath implements BaseEntity {
    constructor(
        public id?: number,
        public clientId?: number,
        public fileParam?: string,
        public fileName?: string,
        public deleteFlag?: string,
    ) {
    }
}
