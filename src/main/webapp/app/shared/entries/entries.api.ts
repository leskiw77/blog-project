import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { Entries } from '../user/entries.model';

@Injectable()
export class EntriesApi  {
    constructor(private http: HttpClient) { }

    get(): Observable<HttpResponse<Entries>> {
        return this.http.get<Entries>(SERVER_API_URL + 'entry/all', {observe : 'response'});
    }

    search(author: string, tags: string[]): any {
        const data = {
            author: author,
            tags: tags
        };

        return this.http.post(SERVER_API_URL + 'entry/search', data, {observe : 'response'}).map(r => r);
    }

    add(entry): Observable<any> {

        const data = {
            title: entry.title,
            text: entry.text,
            tags: entry.tags
        };
        return this.http.post(SERVER_API_URL + 'entry/new', data, {observe : 'response'}).map(authenticateSuccess.bind(this));

        function authenticateSuccess(resp) {
            const bearerToken = resp.headers.get('Authorization');
            if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                const jwt = bearerToken.slice(7, bearerToken.length);
                return jwt;
            }
        }
    }
}
