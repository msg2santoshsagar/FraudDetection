import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RiskContributors } from './risk-contributors.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RiskContributors>;

@Injectable()
export class RiskContributorsService {

    private resourceUrl =  SERVER_API_URL + 'api/risk-contributors';

    constructor(private http: HttpClient) { }

    create(riskContributors: RiskContributors): Observable<EntityResponseType> {
        const copy = this.convert(riskContributors);
        return this.http.post<RiskContributors>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(riskContributors: RiskContributors): Observable<EntityResponseType> {
        const copy = this.convert(riskContributors);
        return this.http.put<RiskContributors>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }
    
     updateList(riskContributors: RiskContributors[]): Observable<EntityResponseType> {
      //  const copy = this.convert(riskContributors);
        return this.http.put<RiskContributors>(this.resourceUrl+"/list", riskContributors, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RiskContributors>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RiskContributors[]>> {
        const options = createRequestOption(req);
        return this.http.get<RiskContributors[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RiskContributors[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RiskContributors = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RiskContributors[]>): HttpResponse<RiskContributors[]> {
        const jsonResponse: RiskContributors[] = res.body;
        const body: RiskContributors[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RiskContributors.
     */
    private convertItemFromServer(riskContributors: RiskContributors): RiskContributors {
        const copy: RiskContributors = Object.assign({}, riskContributors);
        return copy;
    }

    /**
     * Convert a RiskContributors to a JSON which can be sent to the server.
     */
    private convert(riskContributors: RiskContributors): RiskContributors {
        const copy: RiskContributors = Object.assign({}, riskContributors);
        return copy;
    }
}
