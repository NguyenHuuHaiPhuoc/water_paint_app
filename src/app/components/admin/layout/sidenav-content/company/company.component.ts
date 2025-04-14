import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CompanyService } from "../../../../../service/company.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-company',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './company.component.html',
    styleUrl: './company.component.scss',
    providers:[
        CompanyService
    ]
})

export class CompanyComponent implements OnInit{

    public logoReview:any = null;
    public name:any = null;
    public formCompany: FormGroup;

    constructor(
        private fb: FormBuilder,
        private service: CompanyService
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

    private update(){
        if(this.formCompany.valid){
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
            date_of_operation: item.date_of_operation,
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