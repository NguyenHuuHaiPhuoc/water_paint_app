import { Routes } from '@angular/router';
import { HomeComponent } from './components/body/home/home.component';
import { IntroComponent } from './components/body/introduce/intro.component';
import { ProductComponent } from './components/product/product.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ContactComponent } from './components/body/contact/contact.component';
import { AdviseComponent } from './components/body/advise/advise.component';

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
import { ForgotPasswordComponent } from './components/admin/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/admin/change-password/change-password.component';
import { AAuthGuard } from './service/authGuard.guard';
import { DetailComponent } from './components/admin/layout/sidenav-content/products/detail/detail.component';
import { NotFoundComponent } from './components/body/not_found/not-found.component';
import { AuthCallbackComponent } from './components/admin/auth-callback/auth-callback.component';

export const routes: Routes = [
    // {path: '', redirectTo: '', pathMatch: 'full'},
    {
        path: '',
        title: 'Công ty thương mại - dịch vụ HD Chemical',
        component: HomeComponent
    },
    {
        path: 'login',
        title: 'HD Chemical - Đăng nhập',
        component: LoginComponent
    },
    {
        path: 'quen-mat-khau',
        title: 'HD Chemical - Quên mật khẩu',
        component: ForgotPasswordComponent
    },
    {
        path: 'admin',
        title: 'HD Chemical - Trang quản trị',
        component: AdminSideNavContentComponent,
        canActivate: [AAuthGuard],
        children: [
            {
                path: '',
                component: CompanyComponent
            },
            {
                path: 'quan-ly-nhan-vien',
                title:'Quản lý nhân viên',
                component: EmployeeComponent
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
            {
                path: 'doi-mat-khau',
                title:'Đổi mật khẩu',
                component: ChangePasswordComponent
            },
            {
                path: 'tao-tai-khoan',
                title: 'HD Chemical - Tạo tài khoản',
                component: SignupComponent
            },
        ]
    },
    {
        path: 'gioi-thieu',
        title: 'Về chúng tôi',
        component: IntroComponent
    },
    {
        path: 'lien-he',
        title: 'Liên hệ',
        component: ContactComponent
    },
    {
        path: 'tu-van-san-pham',
        title: 'Tư vấn sản phẩm',
        component: AdviseComponent
    },
    {
        path: 'san-pham',
        title: 'Sản phẩm',
        component: ListProductComponent
    },
    {
        path: 'san-pham/mo-ta-chi-tiet',
        title:'Mô tả sản phẩm',
        component: ProductDetailComponent
    },
    {
        path: 'auth/facebook/callback',
        component: AuthCallbackComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
