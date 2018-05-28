import { Component, OnInit } from '@angular/core';

import { Entry } from '../../shared/user/entry.model';

@Component({
    selector: 'jhi-entries',
    templateUrl: './entries.component.html'
})
export class EntriesComponent implements OnInit {

    selectedEntry: Entry;

    constructor() { }

    ngOnInit() {
    }
}
