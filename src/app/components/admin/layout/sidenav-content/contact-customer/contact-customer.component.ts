import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InfoContactService } from "../../../../../service/infoContact.service";

@Component({
    selector: 'app-contact-customer',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './contact-customer.component.html',
    styleUrl: './contact-customer.component.scss',
    providers: [
        InfoContactService
    ]
})

export class ContactCustomerComponent implements OnInit{

    public list:any = [];
    public listFilter:any = [];
    public formInfo: FormGroup;

    constructor(
        private infoContactService: InfoContactService,
        private fb: FormBuilder
    ){
        this.formInfo = fb.group({
            id: [null],
            fullname: [null],
            email: [null],
            phone: [null],
            user_address: [null],
            content: [null],
            create_date: [null],
            is_del: false,
            proccess_status: false
        });
    }

    ngOnInit(): void {
        this.loadListInfoContact();
    }

    private loadListInfoContact(){
        this.infoContactService.findAllInfoContact().subscribe({
            next: (resp) => {
                if(resp.status == 201){
                    this.list = resp.listResult;
                    this.listFilter = resp.listResult;
                }
                // console.log(this.listFilter[0].is_del)
                if(this.listFilter.length > 0 && !this.listFilter[0].is_del){
                    this.viewInfoCustomer(this.listFilter[0]);
                }
            },
            error(err){
                console.error(err);
            }
        });

    }

    public viewInfoCustomer(item:any){
        if(item){
            this.formInfo.setValue({
                id: item.id,
                fullname: item.fullname,
                email: item.email,
                phone: item.phone,
                user_address: item.user_address,
                content: item.content,
                create_date: item.create_date,
                is_del: item.is_del,
                proccess_status: item.proccess_status
            });
        }
    }

    public searchCustomer(e: Event){
        const input = (e.target as HTMLInputElement).value;

        this.listFilter = this.list.filter((item:any) => {

            return JSON.stringify(item.fullname.toLowerCase()).includes(input.toLowerCase());
        });
    }
}