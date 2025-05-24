import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CompanyService } from "../../../../../service/company.service";
import { UploadImage } from "../../../../../service/uploadImage.service";
import Swal from "sweetalert2";
import moment from 'moment';

@Component({
    selector: 'app-company',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './company.component.html',
    styleUrl: './company.component.scss',
    providers:[
        CompanyService,
        UploadImage
    ]
})

export class CompanyComponent implements OnInit{

    public logoReview:any = null;
    private logoUpload:any = null;
    public name:any = null;
    public formCompany: FormGroup;

    constructor(
        private fb: FormBuilder,
        private service: CompanyService,
        private upload : UploadImage
    ){
        this.formCompany = fb.group({
            id: [null],
            name: [null, Validators.required],
            representative: [null, Validators.required],
            date_of_operation: [null, Validators.required],
            tax_code: [null, Validators.required],
            number_employee: [null],
            phone: [null, Validators.required],
            email: [null,Validators.required],
            address: [null, Validators.required],
            logo: [null],
            is_del: 'False'
        })
    }

    ngOnInit(): void {
        this.loadData();
    }

    public chooseLogo(e: any){
        const file = e.target.files;

        if(file && file[0]){
            const reader = new FileReader();
            reader.onload = (f:any) => this.logoReview = f.target.result;
            reader.readAsDataURL(file[0]);
            this.logoUpload = file[0];
        }else {
            this.logoReview = null;
            this.logoUpload = null;
        }
        console.log(this.logoReview);
    }

    public loadData(){
        this.service.findCompanies().subscribe({
            next: (resp) => {
                if(resp.status == 201){
                    if(resp.listResult.length > 0){
                        this.viewCompany(resp.listResult[0]);
                        this.name = resp.listResult[0].name;
                    }
                }
            },
            error(err){
                console.error(err);
            }
        });
    }

    public sendRequest(){
        if(!this.formCompany.value.id){
            this.create();
        }
        else{
            this.update();
        }
    }

    private create() {
        if(this.formCompany.valid){
            this.service.create(this.formCompany.value).subscribe({
                next: (resp) => {
                    if(resp.status == 201){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: resp.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.viewCompany(resp.result);
                    }
                },
                error(err){
                    console.error(err);
                }
            });
        } else{
            Swal.fire({
                title: "Hãy nhập đầy đủ thông tin!",
                icon: "warning",
                draggable: true
            });
        }
    }

    private async update(){
        const urlLogo = this.formCompany.get('logo')?.value;
        if(this.formCompany.valid){
            if(this.logoUpload != null){
                if(urlLogo){
                    this.upload.deleteImageFireBase(urlLogo, 'water_paint/company/logo');
                }
                this.upload.uploadFile('water_paint/company/logo',this.logoUpload).subscribe(
                        (url) => {
                            if(url){
                                this.formCompany.get('logo')?.setValue(url);
                                this.service.update(this.formCompany.value).subscribe({
                                    next: (resp) => {
                                        if(resp.status == 201){
                                            Swal.fire({
                                                position: "center",
                                                icon: "success",
                                                title: resp.message,
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                            this.viewCompany(resp.result);
                                        }
                                        if(resp.status == 401){
                                            Swal.fire({
                                                position: "center",
                                                icon: "success",
                                                title: resp.message,
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                        }
                                    },
                                    error(err){
                                        console.error(err);
                                    }
                                });
                            }
                        }
                    );
            }
            
        } 
        else{
            Swal.fire({
                title: "Hãy nhập đầy đủ thông tin!",
                icon: "warning",
                draggable: true
            });
        }
    }

    private viewCompany(item:any){
        this.formCompany.setValue({
            id: item.id,
            name: item.name,
            representative: item.representative,
            date_of_operation: moment(item.date_of_operation).format('DD-MM-YYYY'),
            tax_code: item.tax_code,
            number_employee: item.number_employee,
            phone: item.phone,
            email: item.email,
            address: item.address,
            logo: item.logo,
            is_del: item.is_del
        });
        this.logoReview = item.logo;
    }
}