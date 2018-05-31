import { Injectable } from '@angular/core';
import {Principal} from "../../../shared/index";
import {EntriesApi} from "../../../shared/entries/entries.api";


@Injectable()
export class AddTopicService {

    constructor(
        private principal: Principal,
        private entriesService: EntriesApi
    ) {}


    add(entry, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.entriesService.add(entry).subscribe((data) => {

                this.principal.identity(true).then((account) => {
                    resolve(data);
                });
                return cb();
            }, (err) => {
                reject(err);
                return cb(err);
            });
        });
    }
}
