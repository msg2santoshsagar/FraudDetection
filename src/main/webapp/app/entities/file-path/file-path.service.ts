import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FilePath } from './file-path.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FilePath>;

@Injectable()
export class FilePathService {

    private resourceUrl =  SERVER_API_URL + 'api/file-paths';

    constructor(private http: HttpClient) { }

    create(filePath: FilePath): Observable<EntityResponseType> {
        const copy = this.convert(filePath);
        return this.http.post<FilePath>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(filePath: FilePath): Observable<EntityResponseType> {
        const copy = this.convert(filePath);
        return this.http.put<FilePath>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    updateList(filePath: FilePath[]): Observable<EntityResponseType> {
       // const copy = this.convert(filePath);
        return this.http.put<FilePath>(this.resourceUrl+"/list", filePath, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FilePath>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FilePath[]>> {
        const options = createRequestOption(req);
        return this.http.get<FilePath[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FilePath[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FilePath = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FilePath[]>): HttpResponse<FilePath[]> {
        const jsonResponse: FilePath[] = res.body;
        const body: FilePath[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FilePath.
     */
    private convertItemFromServer(filePath: FilePath): FilePath {
        const copy: FilePath = Object.assign({}, filePath);
        return copy;
    }

    /**
     * Convert a FilePath to a JSON which can be sent to the server.
     */
    private convert(filePath: FilePath): FilePath {
        const copy: FilePath = Object.assign({}, filePath);
        return copy;
    }
}
