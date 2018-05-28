import { Injectable } from '@angular/core';
import {Principal} from "../../../shared/index";
import {EntriesService} from "../../../shared/entries/entries.service";


@Injectable()
export class AddTopicService {

    constructor(
        private principal: Principal,
        private entriesService: EntriesService
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
