import {Component, AfterViewInit, Renderer, ElementRef, Output, EventEmitter} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { AddTopicService } from './add-topic.service';
import {StateStorageService} from "../../../shared/index";
import {Entry} from "../../../shared/user/entry.model";


@Component({
    selector: 'jhi-addtopic-modal',
    templateUrl: './addtopic.component.html'
})
export class AddTopicModalComponent implements AfterViewInit {
    title: string;
    text: string;
    tags: string[];

    constructor(
        private eventManager: JhiEventManager,
        private addTopicService: AddTopicService,
        private stateStorageService: StateStorageService,
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
            this.activeModal.close();
        });
    }
}
