import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountService } from "../../../service/account.service";
import Swal from "sweetalert2";
import { AuthorityService } from "../../../service/authority.service";
import { RoleService } from "../../../service/role.service";

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

    public signupForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private accountService: AccountService,
        private auththoService: AuthorityService,
        private roleService: RoleService
    ){
        this.signupForm = this.fb.group({
            email: [null],
            password: [null],
            full_name: [null],
            phone: [null]
        });
    }

    ngOnInit(): void {
    }

    public sigup(event: Event){
        event.preventDefault();

        const request = {
            username: this.signupForm.get('email')?.value,
            password: this.signupForm.get('password')?.value,
            full_name: this.signupForm.get('full_name')?.value,
            phone: this.signupForm.get('phone')?.value,
            is_del: false
        };
        
        if(request){
            this.accountService.create(request).subscribe({
                next: (resq)=>{
                    if(resq.status == 201){

                        this.roleService.findRole().subscribe({
                            next: (resqRole) => {
                                // console.log(resqRole.result);
                                const auth = {
                                    role_id: resqRole.result.id,
                                    account_id: resq.result.id
                                }
                                // console.log(auth)
                                this.auththoService.create(auth).subscribe({
                                    next: (resqAuth)=>{
                                        if(resqAuth.status == 201){
        
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
                                            title: resq.message
                                            });
                                            this.resetForm();
                                        }
                                    },
                                    error(err) {
                                        
                                    }
                                });
                            },
                            error(err) {
                                console.log(err)
                            },
                        })
                    }
                    if(resq.status == 401){
                        Swal.fire({
                            title: resq.messagee,
                            icon: "error",
                            draggable: true
                          });
                    }
                },
                error(err) {
                    console.log(err);
                }
            });
        }
    }

    private resetForm() {
        this.signupForm.setValue({
            email: null,
            password: null,
            full_name: null,
            phone: null
        });
    }
}