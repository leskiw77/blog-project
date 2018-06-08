import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Entry} from '../../../shared/user/entry.model';
import {EntriesApi} from '../../../shared/entries/entries.api';

import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AddTopicModalService} from "../addtopic/add-topic-modal.service";
import {HttpResponse} from "@angular/common/http";
import {Entries} from "../../../shared/user/entries.model";


@Component({
    selector: 'app-entry-list',
    templateUrl: './entry-list.component.html',
    styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

    @Output() entryWasSelected = new EventEmitter<Entry>();

    entriesList: Entry[];
    entriesListForTwitter: Entry[];
    modalRef: NgbModalRef;

    authorSearchParam: string = '';
    tagSearchParam: string = '';

    selectedEntry: any = Entry;

    constructor(private entriesApi: EntriesApi,
                private addTopicModalService: AddTopicModalService) {
    }

    ngOnInit() {
        this.loadEntries();
    }

    public loadEntries() {
        this.entriesApi.get().toPromise().then((response) => {
            this.readEntriesFromResponse(response);
        });
    }

    onSelected(entry: Entry) {
        this.selectedEntry = entry;
        this.entryWasSelected.emit(entry);
    }

    newTopic() {
        this.modalRef = this.addTopicModalService.open();
    }

    searchEntries() {
        if(!this.tagSearchParam && !this.authorSearchParam){
            this.loadEntries();
        }
        else if(!this.tagSearchParam){
            this.entriesApi.search(this.authorSearchParam, [])
                .toPromise().then((response) => {
                this.readEntriesFromResponse(response);
            })
        }
        else {
            this.entriesApi.search(this.authorSearchParam,
                this.tagSearchParam.split(',')
                    .map(tag => tag.trim()))
                .toPromise().then((response) => {
                this.readEntriesFromResponse(response);
            })
        }
    }

    readEntriesFromResponse(response: HttpResponse<Entries>) {
        const entries = response.body;

        if (entries) {
            this.entriesList = entries.entriesList;
            this.entriesListForTwitter = entries.entriesListForTweeter;
        } else {
            console.log('Error, cannot get entries');
        }
    }

    deleteEntry() {
        this.entriesApi.delete(this.selectedEntry).toPromise().then(res => console.log(res));
    }
}
