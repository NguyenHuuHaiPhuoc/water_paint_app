import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../../service/account.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
    selector: 'app-login',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    providers: [
        AccountService
    ]
})

export class LoginComponent implements OnInit{

    public loginForm: FormGroup;

    constructor(
        private accountService: AccountService,
        private fb: FormBuilder,
        private router: Router
    ){
        this.loginForm = this.fb.group({
            username: [null],
            password: [null]
        });
    }

    ngOnInit(): void {
        
    }

    public login(e: Event){
        e.preventDefault();

        const req = {
            username: this.loginForm.get('username')?.value,
            password: this.loginForm.get('password')?.value
        }

        this.accountService.findByUsername(req).subscribe({
            next : (resp) => {
                if(resp.status == 201){
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
                    this.router.navigate(['admin']);
                    // set localstorage

                    localStorage.setItem('account',resp.result);
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
        })

    }
}