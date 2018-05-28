import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import {BlogSharedModule, Principal, UserRouteAccessService} from './shared';
import { BlogAppRoutingModule} from './app-routing.module';
import { BlogHomeModule } from './home/home.module';
import { BlogAdminModule } from './admin/admin.module';
import { BlogAccountModule } from './account/account.module';
import { BlogEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';
import { EntriesComponent } from './layouts/entries/entries.component';
import { EntryListComponent } from './layouts/entries/entry-list/entry-list.component';
import { EntryDetailComponent } from './layouts/entries/recipe-detail/entry-detail.component';
import {AddTopicModalComponent} from "./layouts/entries/addtopic/addtopic.component";
import {AddTopicService} from "./layouts/entries/addtopic/add-topic.service";
import {AddTopicModalService} from "./layouts/entries/addtopic/add-topic-modal.service";

@NgModule({
    imports: [
        BrowserModule,
        BlogAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        BlogSharedModule,
        BlogHomeModule,
        BlogAdminModule,
        BlogAccountModule,
        BlogEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
        EntriesComponent,
        EntryListComponent,
        EntryDetailComponent,
        AddTopicModalComponent,
    ],

    providers: [
        ProfileService,
        Principal,
        PaginationConfig,
        AddTopicModalService,
        UserRouteAccessService,
        AddTopicService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class BlogAppModule {}
