import { Routes } from '@angular/router';
import { HomeComponent } from './components/body/home/home.component';
import { IntroComponent } from './components/body/introduce/intro.component';
import { ProductComponent } from './components/product/product.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { ProductItemComponent } from './components/product/product-item/product-item.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ContactComponent } from './components/body/contact/contact.component';

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
        path: 'muc-in-an/lien-he',
        title: 'Liên hệ',
        component: ContactComponent
    },
    {
        path: 'muc-in-an',
        title: 'Sản phẩm',
        component: ProductComponent,
        children: [
            {
                path: 'danh-muc/:path_sp',
                title:'Sảm phẩm',
                component: ListProductComponent
            },
            {
                path: 'san-pham/:path_sp_item',
                title:'Sản phẩm',
                component: ProductItemComponent
            },
            {
                path: 'san-pham-chi-tiet/:path_sp_detail',
                title:'Mô tả sản phẩm',
                component: ProductDetailComponent
            },
        ]
    },
];
