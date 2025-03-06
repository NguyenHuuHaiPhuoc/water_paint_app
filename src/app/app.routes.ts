import { Routes } from '@angular/router';
import { HomeComponent } from './components/body/home/home.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'muc-in-an', pathMatch: 'full'
    },
    {
        path: 'muc-in-an',
        title: 'CÔNG TY HÓA CHẤT',
        component: HomeComponent
    }
];
