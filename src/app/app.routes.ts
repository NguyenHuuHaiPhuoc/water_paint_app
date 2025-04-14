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
import { ProductManagerComponent } from './components/admin/layout/sidenav-content/products/product-manager.component';
import { CategoryComponent } from './components/admin/layout/sidenav-content/categories/category.component';
import { BannerComponent } from './components/admin/layout/sidenav-content/banner/banner.component';
import { AdviseManagerComponent } from './components/admin/layout/sidenav-content/advise/advise.component';
import { ContactCustomerComponent } from './components/admin/layout/sidenav-content/contact-customer/contact-customer.component';
import { AuthorizationComponent } from './components/admin/layout/sidenav-content/authorization/authorization.component';
import { LoginComponent } from './components/admin/login/login.component';
import { SignupComponent } from './components/admin/signup/signup.component';
import { AAuthGuard } from './service/authGuard.guard';
import { DetailComponent } from './components/admin/layout/sidenav-content/products/detail/detail.component';
import { NotFoundComponent } from './components/body/not_found/not-found.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'hdchemicals', pathMatch: 'full'
    },
    {
        path: 'hdchemicals',
        title: 'Công ty thương mai dịch vụ HD Chemical',
        component: HomeComponent
    },
    {
        path: 'login',
        title: 'Đăng nhập',
        component: LoginComponent
    },
    {
        path: 'signup',
        title: 'Đăng ký',
        component: SignupComponent
    },
    {
        path: 'admin',
        title: 'Quản trị viên',
        component: AdminSideNavContentComponent,
        canActivate: [AAuthGuard],
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
                path: 'quan-ly-san-pham/chi-tiet',
                title:'Chi tiết sản phẩm',
                component: DetailComponent
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
        path: 'hdchemicals/gioi-thieu',
        title: 'Về chúng tôi',
        component: IntroComponent
    },
    {
        path: 'hdchemicals/lien-he',
        title: 'Liên hệ',
        component: ContactComponent
    },
    {
        path: 'hdchemicals/tu-van-san-pham',
        title: 'Tư vấn sản phẩm',
        component: AdviseComponent
    },
    {
        path: 'hdchemicals/tu-van-san-pham/:noidungchitiet',
        title: 'Tư vấn sản phẩm',
        component: AdviseDetailComponent
    },
    {
        path: 'hdchemicals',
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
    {
        path: '**',
        component: NotFoundComponent
    }
];
