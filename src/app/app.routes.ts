import { Routes } from '@angular/router';
import { HomeComponent } from './components/body/home/home.component';
import { IntroComponent } from './components/body/introduce/intro.component';
import { ProductComponent } from './components/product/product.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { ProductItemComponent } from './components/product/product-item/product-item.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ContactComponent } from './components/body/contact/contact.component';
import { AdviseComponent } from './components/body/advise/advise.component';
import { AdviseDetailComponent } from './components/body/advise/advise-detail/advise-detail.component';
import { AdminSideNavContentComponent } from './components/admin/layout/sidenav-content/sidenav-content.component';
import { EmployeeComponent } from './components/admin/layout/sidenav-content/employee/employee.component';
import { CompanyComponent } from './components/admin/layout/sidenav-content/company/company.component';
import { OurCompanyComponent } from './components/admin/layout/sidenav-content/our-company/our-company.component';
import { ProductManagerComponent } from './components/admin/layout/sidenav-content/products/product-manager.componet';
import { CategoryComponent } from './components/admin/layout/sidenav-content/categories/category.component';
import { BannerComponent } from './components/admin/layout/sidenav-content/banner/banner.component';
import { AdviseManagerComponent } from './components/admin/layout/sidenav-content/advise/advise.component';
import { ContactCustomerComponent } from './components/admin/layout/sidenav-content/contact-customer/contact-customer.component';
import { AuthorizationComponent } from './components/admin/layout/sidenav-content/authorization/authorization.component';

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
        path: 'admin',
        title: 'Quản trị viên',
        component: AdminSideNavContentComponent,
        children: [
            {
                path: '',
                component: EmployeeComponent
            },
            {
                path: 'thong-tin-cong-ty',
                title:'Thông tin công ty',
                component: CompanyComponent
            },
            {
                path: 'cap-nhat-gioi-thieu',
                title:'Cập nhật giới thiệu',
                component: OurCompanyComponent
            },
            {
                path: 'quan-ly-san-pham',
                title:'Quản lý sản phẩm',
                component: ProductManagerComponent
            },
            {
                path: 'quan-ly-danh-muc',
                title:'Quản lý danh mục',
                component: CategoryComponent
            },
            {
                path: 'quan-ly-banner',
                title:'Quản lý Banner',
                component: BannerComponent
            },
            {
                path: 'quan-ly-thong-tin-tu-van',
                title:'Quản lý thông tin tư vấn',
                component: AdviseManagerComponent
            },
            {
                path: 'quan-ly-thong-tin-khach-hang',
                title:'Quản lý thông tin khách hàng',
                component: ContactCustomerComponent
            },
            {
                path: 'quan-ly-phan-quyen-nhan-su',
                title:'Quản lý phân quyền nhân sự',
                component: AuthorizationComponent
            },
        ]
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
        path: 'muc-in-an/tu-van-san-pham',
        title: 'Tư vấn sản phẩm',
        component: AdviseComponent
    },
    {
        path: 'muc-in-an/tu-van-san-pham/:noidungchitiet',
        title: 'Tư vấn sản phẩm',
        component: AdviseDetailComponent
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
