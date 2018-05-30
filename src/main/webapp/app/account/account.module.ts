import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from '../shared';

import {
    Register,
    ActivateService,
    PasswordService,
    PasswordStrengthBarComponent,
    RegisterComponent,
    ActivateComponent,
    PasswordComponent,
    SocialRegisterComponent,
    SocialAuthComponent,
    accountState
} from './';

@NgModule({
    imports: [
        BlogSharedModule,
        RouterModule.forChild(accountState)
    ],
    declarations: [
        SocialRegisterComponent,
        SocialAuthComponent,
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
    ],
    providers: [
        Register,
        ActivateService,
        PasswordService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogAccountModule {}
