import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Entry } from '../../../shared/user/entry.model';
import { EntriesService } from '../../../shared/entries/entries.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  @Output() entryWasSelected = new EventEmitter<Entry>();

    entriesList: Entry[];

    constructor(
        private entriesService: EntriesService
    ){
    }

    ngOnInit() {
        this.entriesService.get().toPromise().then((response) => {
            const entries = response.body;
            if (entries) {
                this.entriesList = entries.entriesList;
            } else {
                console.log('Cos poszlo nie tak')
            }
        });
    }

  onSelected(entry: Entry) {
    this.entryWasSelected.emit(entry);
  }
}
