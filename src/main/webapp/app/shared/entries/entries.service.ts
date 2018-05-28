import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { Entries } from '../user/entries.model';

@Injectable()
export class EntriesService  {
    constructor(private http: HttpClient) { }

    get(): Observable<HttpResponse<Entries>> {
        return this.http.get<Entries>(SERVER_API_URL + 'entry/all', {observe : 'response'});
    }
}