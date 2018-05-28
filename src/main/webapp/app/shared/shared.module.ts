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
    HasAnyAuthorityDirective,
    JhiSocialComponent,
    SocialService,
} from './';
import { EntriesService } from './entries/entries.service';
import {AddTopicModalComponent} from "../layouts/entries/addtopic/addtopic.component";

@NgModule({
    imports: [
        BlogSharedLibsModule,
        BlogSharedCommonModule
    ],
    declarations: [
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        CSRFService,
        AuthServerProvider,
        SocialService,
        UserService,
        DatePipe,
        EntriesService,
    ],
    entryComponents: [
        JhiLoginModalComponent,
        AddTopicModalComponent,
    ],
    exports: [
        BlogSharedCommonModule,
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class BlogSharedModule {}
