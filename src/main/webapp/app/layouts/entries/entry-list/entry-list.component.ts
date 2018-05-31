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
    modalRef: NgbModalRef;

    searchInput: string;
    searchParam: string;

    authorSearchParam: string = 'user';
    tagSearchParam: string[] = ['a', 'b'];

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
        this.entriesApi.search(this.authorSearchParam, this.tagSearchParam)
        .toPromise().then((response) => {
            this.readEntriesFromResponse(response);
        })
    }

    readEntriesFromResponse(response: HttpResponse<Entries>) {
        const entries = response.body;
        if (entries) {
            this.entriesList = entries.entriesList;
        } else {
            console.log('Error, cannot get entries');
        }
    }

    deleteEntry() {
        this.entriesApi.delete(this.selectedEntry).toPromise().then(res => console.log(res));
    }
}
