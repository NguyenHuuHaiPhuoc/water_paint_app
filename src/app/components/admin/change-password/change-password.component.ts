import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AccountService } from "../../../service/account.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
    selector: 'app-change-password',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss',
    providers:[
        AccountService
    ]
})

 export class ChangePasswordComponent implements OnInit{

    public formUpdate: FormGroup;
    private user:any = null;
    constructor(
        private fb: FormBuilder,
        private accountService: AccountService,
        private router: Router
    ){
        this.formUpdate = this.fb.group({
            pass_old: [null, Validators.required],
            pass_new: [null, Validators.required],
            pass_confirm: [null, Validators.required]
        },
        {
            validator: this.confirmNewPass
        });
    }

    ngOnInit(): void {
        const localStorageData = localStorage.getItem('account');
        if(localStorageData) this.user = JSON.parse(localStorageData);
    }

    private confirmNewPass(form: FormGroup){
        const passNew = form.get('pass_new')?.value;
        const passConfirm = form.get('pass_confirm')?.value;
        return passNew === passConfirm ? null : { mismatch: true };
    }

    public updatePass(){
        if(this.formUpdate.valid && this.user){
            const req = {
                username: this.user.username,
                passOld: this.formUpdate.get('pass_old')?.value,
                passNew: this.formUpdate.get('pass_new')?.value
            }

            this.accountService.updatePass(req).subscribe({
                next: (resp) => {
                    console.log(resp);
                    Swal.fire({
                      position: "center",
                      html: `
                            <div class="spinner-grow text-secondary" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                            <div class="spinner-grow text-secondary" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                            <div class="spinner-grow text-secondary" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                        `,
                      showConfirmButton: false,
                      timer: 3000
                    });

                    if(resp.status == 201){
                        localStorage.setItem('account',JSON.stringify(resp.result));
                        this.resetForm();
                    } else{
                        Swal.fire({
                          title: resp.message,
                          icon: "error",
                          draggable: true
                        });
                    }
                },
                error(err) {console.error(err);}
            });
        }
    }

    public resetForm(){
        this.formUpdate.setValue({
            pass_old: null,
            pass_new: null,
            pass_confirm: null
        })
    }
 }