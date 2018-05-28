import { Route } from '@angular/router';

import { NavbarComponent } from './layouts';
import { EntriesComponent } from "./layouts/entries/entries.component";

export const navbarRoute: Route = {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar'
};

export const entiresRoute: Route = {
    path: 'blog',
    component: EntriesComponent,
    outlet: 'blog'
};
