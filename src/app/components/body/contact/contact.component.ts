import { Component, OnInit } from "@angular/core";
import { InfoContactService } from "../../../service/infoContact.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { CompanyService } from "../../../service/company.service";

@Component({
    selector: 'app-contact',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl:'./contact.component.html',
    styleUrl:'./contact.component.scss',
    providers: [
        InfoContactService,
        CompanyService
    ]
})

export class ContactComponent implements OnInit{

    public company:any=[];
    public formInfo: FormGroup;
    constructor(
        private infoContactService: InfoContactService,
        private fb: FormBuilder,
        private companyService: CompanyService
    ) {
        this.formInfo = fb.group({
            fullname: [null, Validators.required],
            email: [null, Validators.required],
            phone: [null, Validators.required],
            user_address: [null, Validators.required],
            content: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(){
        this.companyService.findCompanies().subscribe({
            next: (resp) => {
                if(resp.status == 201){
                    this.company = resp.listResult[0];
                }
            },
            error(err){
                console.error(err);
            }
        })
    }

    public sendInfo(){
        if(this.formInfo.valid){
            const req ={
                fullname: this.formInfo.value.fullname,
                email: this.formInfo.value.email,
                phone: this.formInfo.value.phone,
                user_address: this.formInfo.value.user_address,
                content: this.formInfo.value.content,
                is_del: 'False',
                proccess_status: 'False'
            }
            this.infoContactService.create(req).subscribe({
                next: (resp) => {
                    if(resp.status == 201){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: resp.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.resetForm();
                    }
                },
                error(err) {
                    console.error(err);
                }
            });
        }else{
            Swal.fire({
                title: "Hãy nhập đầy đủ thông tin!",
                icon: "warning",
                draggable: true
            });
        }
    }

    public resetForm(){
        this.formInfo.setValue({
            fullname: null,
            email: null,
            phone: null,
            user_address: null,
            content: null
        });
    }
}