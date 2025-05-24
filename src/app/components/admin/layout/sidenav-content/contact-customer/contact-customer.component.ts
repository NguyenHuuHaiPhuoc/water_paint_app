import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InfoContactService } from "../../../../../service/infoContact.service";
import { AESUtil } from '../../../../../util/aesUtil';

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
    public currentPage: number = 0;
    public pageSize: number = 4;
    public totalItems: number = 0;
    public totalPages:number = 0;
    public isPrevInfoCustomer:any;
    public isNextInfoCustomer:any;

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
            proccess_status: false,
            productID: [null],
            product_name: [null]
        });
    }

    ngOnInit(): void {
        this.loadListInfoContact();
    }

    private loadListInfoContact(page?:any, size?:any){
        this.infoContactService.findAllInfoContact(page,size).subscribe({
            next: (resp) => {
                this.listFilter = resp.content.map(
                    (item:any) => JSON.parse(AESUtil.decrypt(item.encryptedData))
                );
                console.log(resp);
                if(this.listFilter.length > 0 && !this.listFilter[0].is_del){
                    this.viewInfoCustomer(this.listFilter[0]);
                }
                this.totalItems = resp.totalElements;
                this.totalPages = resp.totalPages;
                this.isPrevInfoCustomer = resp.first;
                this.isNextInfoCustomer = resp.last;
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
                proccess_status: item.proccess_status,
                productID: item.productID,
                product_name: item.product_name
            });
        }
    }

    public searchCustomer(e: Event){
        const input = (e.target as HTMLInputElement).value;

        this.listFilter = this.list.filter((item:any) => {

            return JSON.stringify(item.fullname.toLowerCase()).includes(input.toLowerCase());
        });
    }

    public paginationInfoCustomer(action:any){
        switch (action) {
          case 'prev':
            if (this.currentPage > 0) {
              this.currentPage--;
              this.loadListInfoContact(this.currentPage,this.pageSize);
            }
            break;
          case 'next':
            if (!this.isNextInfoCustomer) {
              this.currentPage++;
              this.loadListInfoContact(this.currentPage,this.pageSize);
            }
            break;
          default:
            console.log('Unknown action.');
            break;
        }
      }
}