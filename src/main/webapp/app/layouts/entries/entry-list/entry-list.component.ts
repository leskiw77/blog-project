import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Entry } from '../../../shared/user/entry.model';
import { EntriesService } from '../../../shared/entries/entries.service';

import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AddTopicModalService} from "../addtopic/add-topic-modal.service";



@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  @Output() entryWasSelected = new EventEmitter<Entry>();

    entriesList: Entry[];
    modalRef: NgbModalRef;

    constructor(
        private entriesService: EntriesService,
        private addTopicModalService: AddTopicModalService
    ){
    }

    ngOnInit() {
        this.loadEntries();
    }

    public loadEntries() {
        this.entriesService.get().toPromise().then((response) => {
            const entries = response.body;
            if (entries) {
                this.entriesList = entries.entriesList;
            } else {
                console.log('Error, cannot get entries');
            }
        });
    }

    onSelected(entry: Entry) {
        this.entryWasSelected.emit(entry);
    }

    newTopic() {
        this.modalRef = this.addTopicModalService.open();
    }
}
