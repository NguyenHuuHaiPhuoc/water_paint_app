import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AccountService } from "../../../service/account.service";
import { interval, Subscription } from 'rxjs';
import Swal from "sweetalert2";
import { Router } from "@angular/router";

declare var $: any;
@Component({
    selector: 'app-forgot-password',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss',
    providers:[
        AccountService
    ]
})

 export class ForgotPasswordComponent implements OnInit, OnDestroy {

    public randomNumber:string = '';
    private isMatched:boolean = false;
    public second:number = 60;
    public isVisible:boolean = false;
    public form: FormGroup;
    public isShow:boolean = false;
    private intervalSubscription!: Subscription;
    constructor(
        private fb: FormBuilder,
        private accountService: AccountService,
        private router: Router
    ){
        this.form = this.fb.group({
            username: [null, Validators.required],
            code: [null, Validators.required],
            pass: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        const data = window.history.state.data;
        if(data){
            this.form.get('username')?.setValue(data);
        }
        this.startGeneratingNumbers();
    }

    private startGeneratingNumbers(): void {
        this.generateRandomNumbers(); // Tạo số ngay khi bắt đầu

        // Khởi động interval mỗi giây
        this.intervalSubscription = interval(1000).subscribe(() => {
          if (this.second > 0) {
            this.second--; // Giảm số giây đếm lùi
          } else {
            this.generateRandomNumbers(); // Tạo lại dãy số khi hết thời gian
            this.second = 60; // Reset bộ đếm
          }
        });
      }

    private generateRandomNumbers(): void {
        const firstGroup = Math.floor(100 + Math.random() * 900);
        const secondGroup = Math.floor(100 + Math.random() * 900);
        this.randomNumber = `${firstGroup} ${secondGroup}`;
    }

    private stopGeneratingNumbers(): void {
        if (this.intervalSubscription) {
          this.intervalSubscription.unsubscribe(); // Dừng interval
        }
    }

    public confirmCode(){
        if(this.form.get('username')?.value){
            let userNumbers = this.form.get('code')?.value;
            this.isMatched = this.randomNumber.replace(/\s+/g, '') == userNumbers.replace(/\s+/g, '');
            
            if (this.isMatched) {
              this.stopGeneratingNumbers(); // Dừng việc tạo số mới
              this.isVisible = true;
            }
        } else {
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
              icon: "warning",
              title: "Chưa có tên đăng nhập"
            });
        }
    }

    ngOnDestroy(): void {
        this.stopGeneratingNumbers(); // Hủy subscription khi component bị hủy
    }

    public updatePass(){
        if(this.isMatched){
            const req = {
                username: this.form.get('username')?.value,
                password: this.form.get('pass')?.value
            }
            this.accountService.forgotPass(req).subscribe({
                next: (resp) => {
                    if(resp.status == 201){
                        let timerInterval: ReturnType<typeof setInterval>;

                        Swal.fire({
                          title: "Đang xử lý!",
                          timer: 2000,
                          timerProgressBar: true,
                          didOpen: () => {
                            Swal.showLoading();
                            const popup = Swal.getPopup();
                            if (popup) {
                              timerInterval = setInterval(() => {
                                }, 100);
                            }
                          },
                          willClose: () => {
                            clearInterval(timerInterval);
                            localStorage.setItem('account',JSON.stringify(resp.result));
                            this.router.navigate(['/admin']);
                          }
                        }).then((result) => {
                          if (result.dismiss === Swal.DismissReason.timer) {
                            console.log("I was closed by the timer");
                          }
                        });

                    }
                    if(resp.status == 401){
                        Swal.fire({
                          title: resp.message,
                          icon: "warning",
                          draggable: true
                        });
                    }
                },
                error(err) {console.error(err);}
            });
        }
    }

    public showPassword(){
        this.isShow = !this.isShow;
        if(this.isShow)
            $('#password').attr('type','text');
        else
            $('#password').attr('type','password');
    }
 }