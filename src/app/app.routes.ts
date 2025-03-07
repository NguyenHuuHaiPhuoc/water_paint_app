import { Routes } from '@angular/router';
import { HomeComponent } from './components/body/home/home.component';
import { IntroComponent } from './components/body/introduce/intro.component';
import { ProductComponent } from './components/product/product.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { ProductItemComponent } from './components/product/product-item/product-item.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'muc-in-an', pathMatch: 'full'
    },
    {
        path: 'muc-in-an',
        title: 'CÔNG TY HÓA CHẤT',
        component: HomeComponent
    },
    {
        path: 'muc-in-an/gioi-thieu',
        title: 'Về chúng tôi',
        component: IntroComponent
    },
    {
        path: 'muc-in-an',
        title: 'Sản phẩm',
        component: ProductComponent,
        children: [
            {
                path: 'danh-muc-san-pham/:sp_id',
                title:'Sảm phẩm',
                component: ListProductComponent
            },
            {
                path: 'mat-hang-san-pham',
                title:'Sản phẩmphẩm',
                component: ProductItemComponent
            },
        ]
    },
];
