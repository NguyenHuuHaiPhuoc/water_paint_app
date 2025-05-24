import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../../service/account.service";
import { AuthenService } from "../../../service/authen.service";
// import { FaceBookService } from '../../../service/authenFaceBook.service';
// import { SocialAuthService } from "@abacritt/angularx-social-login";
// import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import Swal from "sweetalert2";

declare const google: any;
@Component({
    selector: 'app-login',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    providers: [
        AccountService,
        AuthenService,
        // FaceBookService
    ]
})

export class LoginComponent implements OnInit{

    public loginForm: FormGroup;

    constructor(
        private accountService: AccountService,
        private authenService: AuthenService,
        private fb: FormBuilder,
        private router: Router,
        // private socialService: SocialAuthService,
        // private fbService: FaceBookService,
        private http: HttpClient
    ){
        this.loginForm = this.fb.group({
            username: [null, Validators.required],
            password: [null, Validators.required]
        });
    }

    async ngOnInit(): Promise<void> {
        // window.onpopstate = () => {
        //     this.reloadGoogleSignInButton();
        // };
        
        setTimeout(() => {
            const userProfile = sessionStorage.getItem('id_token_claims_obj');
            
            if(userProfile){
                const user = JSON.parse(userProfile);
                const req = {
                    username: user.email,
                    password: Math.floor(Math.random() * (999 - 100 + 1)) + 100,
                    full_name: `${user.family_name} ${user.given_name}`,
                    is_del: false,
                    img: user.picture,
                    type_login: 'google',
                }
                
                this.accountService.loginWithOauth(req).subscribe(
                    {
                        next: (resp) => {
                            if(resp && resp.result){
                                sessionStorage.setItem('id_token_claims_obj',resp.result);
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                        toast.onmouseenter = Swal.stopTimer;
                                        toast.onmouseleave = Swal.resumeTimer;
                                    }
                                });
                                Toast.fire({
                                    icon: "success",
                                    title: "Đăng nhập thành công"
                                });
                                this.router.navigateByUrl('admin');
                            }
                        },
                        error(err){console.error(err);}
                    }
                );
            }

            
        }, 1000);
    }

    private reloadGoogleSignInButton(): void {
        google.accounts.id.renderButton(document.getElementById("google-signin-btn"), {
            theme: "outline",
            size: "large"
        });
    }

    public login(e: Event){
        e.preventDefault();

        if(this.loginForm.valid){
            const req = {
                username: this.loginForm.get('username')?.value,
                password: this.loginForm.get('password')?.value
            }

            this.accountService.findByUsername(req).subscribe({
                next : (resp) => {
                    if(resp && resp.status == 201){
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "success",
                            title: resp.message
                        });
                        sessionStorage.setItem('id_token_claims_obj',JSON.stringify(resp.result));
                        this.router.navigate(['admin']);
                    } else{
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "error",
                            title: resp.message
                        });
                    }
                },
                error(err) {
                    console.log(err);
                },
            });
        }

    }

    // public loginWithFacebook() {
    //     this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID)
    //     .then((data) => {
    //         const req = {
    //                 username: data.email,
    //                 password: Math.floor(Math.random() * (999 - 100 + 1)) + 100,
    //                 full_name: data.name,
    //                 is_del: false,
    //                 img: data.photoUrl,
    //                 type_login: data.provider.toLowerCase(),
    //             }
    //             this.accountService.loginWithOauth(req).subscribe(
    //                 {
    //                     next: (resp) => {
    //                         if(resp && resp.result){
    //                             const Toast = Swal.mixin({
    //                                 toast: true,
    //                                 position: "top-end",
    //                                 showConfirmButton: false,
    //                                 timer: 3000,
    //                                 timerProgressBar: true,
    //                                 didOpen: (toast) => {
    //                                     toast.onmouseenter = Swal.stopTimer;
    //                                     toast.onmouseleave = Swal.resumeTimer;
    //                                 }
    //                             });
    //                             Toast.fire({
    //                                 icon: "success",
    //                                 title: "Đăng nhập thành công"
    //                             });
    //                             const fbData = sessionStorage.getItem('fbssls_744812297874344');
    //                             if(fbData){
    //                                 try{
    //                                     let parsedData = JSON.parse(fbData);
    //                                     parsedData.encryptedData = resp.result.encryptedData;
    //                                     sessionStorage.setItem("fbssls_744812297874344", JSON.stringify(parsedData));
    //                                     this.router.navigateByUrl('admin');
    //                                 }catch(e) {
    //                                     console.error("Lỗi khi xử lý JSON:", e);
    //                                 }
    //                             }
    //                         }
    //                     },
    //                     error(err){console.error(err);}
    //                 }
    //             );
    //     })
    //     .catch(error => {
    //         console.error("Đăng nhập thất bại:", error);
    //     });

    // }

    // public loginWithGoogle(){
    //     this.authenService.login();
    // }

    public forgotPass() {
        this.router.navigate(['/quen-mat-khau'], {state: {data: this.loginForm.get('username')?.value}});
    }

    // <p class="sign-up-label text-center">
    //         Bạn chưa có tài khoản? <a href="signup"><span class="sign-up-link">Đăng ký ngay</span></a>
    //     </p>
    //     <div class="buttons-container">
    //         <div class="facebook-login-button" (click)="loginWithFacebook()">
    //             <i class="bi bi-facebook fs-6"></i>
    //             <span>Đăng nhập bằng Facebook</span>
    //         </div>
    //         <div class="google-login-button" (click)="loginWithGoogle()">
    //             <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px"
    //                 class="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    //                 <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
    //                   c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
    //                   c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    //                                     <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
    //                   C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    //                                     <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
    //                   c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    //                                     <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
    //                   c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
    //                 </path>
    //             </svg>
    //             <span>Đăng nhập bằng Google</span>
    //         </div>
    //     </div>
}