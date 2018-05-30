import {Component, OnInit, ViewChild} from '@angular/core';

import { Entry } from '../../shared/user/entry.model';
import {EntryListComponent} from "./entry-list/entry-list.component";

@Component({
    selector: 'jhi-entries',
    templateUrl: './entries.component.html'
})
export class EntriesComponent implements OnInit {

    selectedEntry: Entry;

    constructor() { }

    @ViewChild(EntryListComponent)
    listComponent: EntryListComponent;

    ngOnInit() {
    }

    onModalClosed(arg: any) {
        console.log('arg = '+JSON.stringify(arg));
        this.listComponent.loadEntries();
    }
}
