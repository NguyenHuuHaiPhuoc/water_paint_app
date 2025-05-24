import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

import { InfoContactService } from "../../../service/infoContact.service";

declare var $:any;
@Component({
    selector: 'app-product-detail',
    imports: [],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss',
    providers: [
        InfoContactService
    ]
})

export class ProductDetailComponent implements OnInit{
    public product:any;

    constructor (
        private infoContactService: InfoContactService
    ) {}
    ngOnInit(): void {
        this.product = history.state.data;  
    }

    public send(){
        const name = $('#name').val();
        const phoneValue = $('#phone').val();

        if(phoneValue){
            if(this.isValidPhoneNumber(phoneValue)){
                const req= {
                    fullname: name,
                    phone : phoneValue,
                    productID: this.product.id,
                    product_name: this.product.name
                }
                this.infoContactService.create(req).subscribe({
                    next: (data) => {
                        if(data.status == 201){
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
                              title: data.message
                            });
                            $('#phone').val('');
                            $('#name').val('');
                        }
                    },
                    error(err) {
                        console.error(err);
                    }
                });
            } else{
                Swal.fire({
                  title: "Số điện thoại không đúng định dạng",
                  imageWidth: 400,
                  imageHeight: 100,
                });
            }
        }
    }

    private isValidPhoneNumber(phone: string): boolean {
        return /^(03|05|07|08|09)[0-9]{8}$/.test(phone);
      }
}