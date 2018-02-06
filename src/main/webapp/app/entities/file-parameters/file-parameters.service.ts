import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FileParameters } from './file-parameters.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FileParameters>;

@Injectable()
export class FileParametersService {

    private resourceUrl =  SERVER_API_URL + 'api/file-parameters';

    constructor(private http: HttpClient) { }

    create(fileParameters: FileParameters): Observable<EntityResponseType> {
        const copy = this.convert(fileParameters);
        return this.http.post<FileParameters>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(fileParameters: FileParameters): Observable<EntityResponseType> {
        const copy = this.convert(fileParameters);
        return this.http.put<FileParameters>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FileParameters>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FileParameters[]>> {
        const options = createRequestOption(req);
        return this.http.get<FileParameters[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FileParameters[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FileParameters = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FileParameters[]>): HttpResponse<FileParameters[]> {
        const jsonResponse: FileParameters[] = res.body;
        const body: FileParameters[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FileParameters.
     */
    private convertItemFromServer(fileParameters: FileParameters): FileParameters {
        const copy: FileParameters = Object.assign({}, fileParameters);
        return copy;
    }

    /**
     * Convert a FileParameters to a JSON which can be sent to the server.
     */
    private convert(fileParameters: FileParameters): FileParameters {
        const copy: FileParameters = Object.assign({}, fileParameters);
        return copy;
    }
}
