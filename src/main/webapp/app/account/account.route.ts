import { Routes } from '@angular/router';

import {
    activateRoute,
    passwordRoute,
    registerRoute,
    socialRegisterRoute,
    socialAuthRoute
} from './';

const ACCOUNT_ROUTES = [
    activateRoute,
    passwordRoute,
    registerRoute,
    socialAuthRoute,
    socialRegisterRoute
];

export const accountState: Routes = [{
    path: '',
    children: ACCOUNT_ROUTES
}];
