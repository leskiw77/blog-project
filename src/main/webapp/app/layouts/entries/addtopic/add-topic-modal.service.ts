import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { AddTopicModalComponent } from './addtopic.component';

@Injectable()
export class AddTopicModalService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
    ) {}

    open(): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(AddTopicModalComponent);
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }
}
