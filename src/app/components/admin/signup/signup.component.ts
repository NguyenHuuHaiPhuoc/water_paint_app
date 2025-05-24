import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AccountService } from "../../../service/account.service";
import Swal from "sweetalert2";
import { AuthorityService } from "../../../service/authority.service";
import { RoleService } from "../../../service/role.service";
import { phoneValidators } from "../../../validators/phoneValidators";
import { AESUtil } from '../../../util/aesUtil';

declare var $:any;
@Component({
    selector: 'app-signup',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
    providers: [
        AccountService
        , AuthorityService
        , RoleService
    ]
})

export class SignupComponent{

    public eye:any = false;
    public signupForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private accountService: AccountService,
        private auththoService: AuthorityService,
        private roleService: RoleService
    ){
        this.signupForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required],
            full_name: [null, Validators.required],
            phone: [null, [Validators.required, phoneValidators]]
        });
    }

    ngOnInit(): void {
    }

    public sigup(event: Event){
        event.preventDefault();
        const validPhone = this.isValidPhoneNumber(this.signupForm.get('phone')?.value);
        if(validPhone){
            const request = {
                username: this.signupForm.get('email')?.value,
                password: this.signupForm.get('password')?.value,
                full_name: this.signupForm.get('full_name')?.value,
                phone: this.signupForm.get('phone')?.value,
                is_del: false,
                type_login: 'app',
            };
        }else{
            Swal.fire({
              title: "Số điện thoại chưa hợp lệ!",
              icon: "warning",
              draggable: true
            });
        }

        

        // if(request){
        //     this.accountService.create(request).subscribe({
        //         next: (resq)=>{
        //             if(resq.status == 201){
        //                 this.roleService.findRole('staff').subscribe({
        //                     next: (resqRole) => {
        //                         if(resqRole.status == 201){
        //                             const data = JSON.parse(AESUtil.decrypt(resqRole.result.encryptedData));
        //                             const auth = {
        //                                 role_id: data.id,
        //                                 account_id: resq.result.id
        //                             }
        //                             this.auththoService.create(auth).subscribe({
        //                                 next: (resqAuth)=>{
        //                                     if(resqAuth.status == 201){
            
        //                                         const Toast = Swal.mixin({
        //                                             toast: true,
        //                                             position: "top-end",
        //                                             showConfirmButton: false,
        //                                             timer: 3000,
        //                                             timerProgressBar: true,
        //                                             didOpen: (toast) => {
        //                                               toast.onmouseenter = Swal.stopTimer;
        //                                               toast.onmouseleave = Swal.resumeTimer;
        //                                             }
        //                                         });
        //                                         Toast.fire({
        //                                         icon: "success",
        //                                         title: resq.message
        //                                         });
        //                                         this.resetForm();
        //                                     }
        //                                 },
        //                                 error(err) {
                                            
        //                                 }
        //                             });
        //                         }  
        //                     },
        //                     error(err) {
        //                         console.log(err)
        //                     },
        //                 });
        //             }
        //             if(resq.status == 401){
        //                 Swal.fire({
        //                     title: resq.messagee,
        //                     icon: "error",
        //                     draggable: true
        //                   });
        //             }
        //         },
        //         error(err) {
        //             console.log(err);
        //         }
        //     });
        // }
    }

    private resetForm() {
        this.signupForm.setValue({
            email: null,
            password: null,
            full_name: null,
            phone: null
        });
    }

    private isValidPhoneNumber(phone: string): boolean {
        return /^(03|05|07|08|09)[0-9]{8}$/.test(phone);
    }

    public show() {
        $('#password').attr("type","text");
        this.eye = true;
    }

    public hide() {
        $('#password').attr("type","password");
        this.eye = false;
    }
}