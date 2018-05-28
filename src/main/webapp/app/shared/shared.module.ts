import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    BlogSharedLibsModule,
    BlogSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    HasAnyAuthorityDirective,
    JhiSocialComponent,
    SocialService,
} from './';
import { EntriesService } from './entries/entries.service';
import { AddTopicModalComponent } from "./addtopic/addtopic.component";
import {AddTopicService} from "./addtopic/add-topic.service";

@NgModule({
    imports: [
        BlogSharedLibsModule,
        BlogSharedCommonModule
    ],
    declarations: [
        JhiSocialComponent,
        JhiLoginModalComponent,
        AddTopicModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        SocialService,
        UserService,
        DatePipe,
        EntriesService,
        AddTopicService
    ],
    entryComponents: [
        JhiLoginModalComponent,
        AddTopicModalComponent
    ],
    exports: [
        BlogSharedCommonModule,
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        AddTopicModalComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class BlogSharedModule {}
