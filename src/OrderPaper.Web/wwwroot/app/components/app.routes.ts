import { RouterModule, Routes }   from '@angular/router';
import { MasterComponent }        from './master.component';
import { HomeComponent }          from './home.component';

const appRoutes: Routes = [
    {
        path: '',
        component: MasterComponent       
    },
    {
        path: 'home',
        component: HomeComponent
    },
];

export const routing = RouterModule.forRoot(appRoutes);