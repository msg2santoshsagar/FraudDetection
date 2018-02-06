import { BaseEntity } from './../../shared';

export class FileParameters implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
