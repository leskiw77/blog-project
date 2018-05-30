import {AfterViewInit, Component, ElementRef, EventEmitter, Output, Renderer} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AddTopicService} from './add-topic.service';

@Component({
    selector: 'jhi-addtopic-modal',
    templateUrl: './addtopic.component.html'
})
export class AddTopicModalComponent implements AfterViewInit {
    title: string;
    text: string;
    tags: string[];

    @Output() onModalClosed: EventEmitter<any> = new EventEmitter();

    constructor(
        private addTopicService: AddTopicService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        public activeModal: NgbActiveModal
    ) {
        this.tags = ['alan']
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#topic'), 'focus', []);
    }

    addTopic() {
        this.addTopicService.add({
            title: this.title,
            text: this.text,
            tags: this.tags
        }).then(() => {
            this.onModalClosed.emit("CLOSED");
            this.activeModal.close();
        });
    }
}
