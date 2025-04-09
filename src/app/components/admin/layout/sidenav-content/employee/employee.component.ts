import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../../../../service/account.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import Swal from "sweetalert2";
import { UploadImage } from "../../../../../service/uploadImage.service";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { ListResult } from "@angular/fire/storage";

@Component({
    selector: 'app-employee',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './employee.component.html',
    styleUrl: './employee.component.scss',
    providers: [
        AccountService,
        UploadImage
    ]
})

export class EmployeeComponent implements OnInit{

    private listAccount:any = [];
    public listAccountFilter:any = [];
    public imgReview:any = null;
    private imgUpload:any = null;

    public formAccount: FormGroup;
    constructor(
        private accountService: AccountService,
        private upload: UploadImage,
        private fireStorage: AngularFireStorage,
        private fb: FormBuilder
    ){
        this.formAccount = this.fb.group({
            id: [null],
            full_name: [null],
            emp_code: [null],
            gender: [null],
            birthday: [null],
            hometown: [null],
            nationality: [null],
            no_cart: [null],
            date_cart: [null],
            where_cart: [null],
            tax_code: [null],
            date_tax_code: [null],
            img:[null]
        });
    }

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(){
        this.accountService.findAllAccount().subscribe({
            next: (resp) => {
                if(resp.status == 201){
                    this.listAccount = resp.listResult;
                    this.listAccountFilter = resp.listResult;
                }
            },
            error(err) {
                console.log(err);
            },
        });
    }

    public viewAccount(account:any){
        if(account){
            this.formAccount.setValue({
                id: account.id,
                full_name: account.full_name,
                emp_code: account.emp_code,
                gender: account.gender,
                birthday: account.birthday,
                hometown: account.hometown,
                nationality: account.nationality,
                no_cart: account.no_cart,
                date_cart: account.date_cart,
                where_cart: account.where_cart,
                tax_code: account.tax_code,
                date_tax_code: account.date_tax_code,
                img: account.img
            });

            this.imgReview = account.img;
        }
    }

    public chooseimage(e: any){
        const file = e.target.files;

        if(file && file[0]){
            const reader = new FileReader();
            reader.onload = (f:any) => this.imgReview = f.target.result;
            reader.readAsDataURL(file[0]);
            this.imgUpload = file[0];
        } else{
            this.imgReview = null;
            this.imgUpload = null;
        }
    }

    public removeImage() {
        this.imgReview = null;
    }

    public update(){
        if(this.formAccount.get("id")?.value){
            if(this.imgUpload){
                this.upload.uploadFile('water_paint/employee/avatar',this.imgUpload).subscribe(
                    (url) => {
                        // console.log(url);
                        if(url){
                            const req = {
                                id: this.formAccount.value.id,
                                full_name: this.formAccount.value.full_name,
                                emp_code: this.formAccount.value.emp_code,
                                gender: this.formAccount.value.gender,
                                birthday: this.formAccount.value.birthday,
                                hometown: this.formAccount.value.hometown,
                                nationality: this.formAccount.value.nationality,
                                no_cart: this.formAccount.value.no_cart,
                                date_cart: this.formAccount.value.date_cart,
                                where_cart: this.formAccount.value.where_cart,
                                tax_code: this.formAccount.value.tax_code,
                                date_tax_code: this.formAccount.value.date_tax_code,
                                is_del: false,
                                img: url
                            }
                            this.saveAccount(req);
                        }
                    },
                    (err) => {
                        console.error(err)
                    }
                );
            }else{
                const req = {
                    id: this.formAccount.value.id,
                    full_name: this.formAccount.value.full_name,
                    emp_code: this.formAccount.value.emp_code,
                    gender: this.formAccount.value.gender,
                    birthday: this.formAccount.value.birthday,
                    hometown: this.formAccount.value.hometown,
                    nationality: this.formAccount.value.nationality,
                    no_cart: this.formAccount.value.no_cart,
                    date_cart: this.formAccount.value.date_cart,
                    where_cart: this.formAccount.value.where_cart,
                    tax_code: this.formAccount.value.tax_code,
                    date_tax_code: this.formAccount.value.date_tax_code,
                    is_del: false,
                    img: this.formAccount.value.img
                }
                this.saveAccount(req);
            }
            this.loadData();   
        } else{
            Swal.fire({
                title: "Hãy chọn 1 nhân viên để cập nhật",
                icon: "error",
                draggable: true
            });
        }
    }

    public searchUser(e: Event){
        const inputValue = (e.target as HTMLInputElement).value;

        this.listAccountFilter = this.listAccount.filter((item:any) => {
            return JSON.stringify(item.full_name.toLowerCase()).includes(inputValue.toLowerCase());
        });
    }

    private saveAccount(req:any){
        this.accountService.update(req).subscribe(
            {
                next: (resp) => {
                    if(resp.status == 201){
                        Swal.fire({
                            title: resp.message,
                            icon: "success",
                            draggable: true
                          });
                    }
                },
                error(err) {
                    console.error(err);
                },
            }
        );
    }

    public deleteUser(){
        const id = this.formAccount.get("id")?.value;
        if(id) {
            Swal.fire({
                title: "Bạn có chắc chắn muốn xóa?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Xác nhận",
                cancelButtonText: "Hủy bỏ"
              }).then((result) => {
                if (result.isConfirmed) {
                    const req = {
                        userID: id
                    }
                    this.accountService.delete(req).subscribe({
                        next: (resp) => {
                            if(resp.status == 201){
                                if(resp.result.img){
                                    this.removeImageFirebase(resp.result.img, 'water_paint/employee/avatar');
                                }
                                Swal.fire({
                                    title: resp.message,
                                    icon: "success"
                                });
                            }
                            if(resp.status == 401){
                                Swal.fire({
                                    title: resp.message,
                                    icon: "success"
                                  });
                            }
                            this.loadData();
                            this.resetForm();
                        },
                        error(err) {
                            console.error(err);   
                            Swal.fire({
                              title: "Xóa thất bại!",
                              icon: "error"
                            });
                        }
                    })
                }
              });
        } else{
            Swal.fire({
                title: "Bạn chưa chọn nhân viên nào!",
                icon: "warning"
              });
        }
    }

    private async removeImageFirebase(img: any, path: any) {
        const firebaseItems = await this.upload.getAllItemFirebase(path);

        firebaseItems.forEach(async (item) => {
            const url = await item.getDownloadURL();
            if (url.includes(img)) { // So sánh item trong Firebase với DB
            await item.delete(); // Xóa nếu trùng khớp
            console.log(`Đã xóa tệp: ${item.name}`);
            }
        });
    }

    private resetForm(){
        this.formAccount.setValue({
            id: null,
            full_name: null,
            emp_code: null,
            gender: null,
            birthday: null,
            hometown: null,
            nationality: null,
            no_cart: null,
            date_cart: null,
            where_cart: null,
            tax_code: null,
            date_tax_code: null,
            img: null
        });

        this.imgReview = null;
    }
}