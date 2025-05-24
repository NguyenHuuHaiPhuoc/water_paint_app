import { Component, OnInit } from "@angular/core";
import { AESUtil } from '../../../../../util/aesUtil';
import { AccountService } from "../../../../../service/account.service";
import { AuthorityService } from "../../../../../service/authority.service";
import Swal from "sweetalert2";

declare var $:any;
@Component({
    selector: 'app-authorization',
    imports: [],
    templateUrl: './authorization.component.html',
    styleUrl: './authorization.component.scss',
    providers: [
        AccountService,
        AuthorityService
    ]
})

export class AuthorizationComponent implements OnInit{

    public listAccountFilter:any = [];
    private listAccount:any = [];
    public authority:any = [];
    public fullName:string = '';

    constructor(
        private accountService: AccountService,
        private authorityService: AuthorityService,
    ){}

    ngOnInit(): void {
        this.loadListAccount();
    }

    private loadListAccount() {
        this.accountService.findAllAccount().subscribe(
            {
                next: (data) => {
                    this.listAccountFilter = data.map(
                        (item:any) => JSON.parse(AESUtil.decrypt(item.encryptedData))
                    );
                    this.listAccount = this.listAccountFilter;
                    this.chooseEmployee(this.listAccountFilter[0]);
                },
                error(err) {console.error(err);}
            }
        );
    }

    private getRoleByAccount(id:any){
        this.authorityService.roleByAccount(id).subscribe(
            {
                next: (data) => {
                    if(data.status == 201){
                        this.authority = JSON.parse(AESUtil.decrypt(data.result.encryptedData));
                        // console.log(this.authority)
                        this.setRoleHTML(this.authority.roleName);
                    }
                },
                error(err) {console.error(err);}
            }
        );
    }

    private setRoleHTML(role:any){
        const radio = document.querySelectorAll(".role");

        radio.forEach(element => {
            if(element.id == role){
                $(`#${element.id}`).prop('checked',true);
            }
        });
    }

    public chooseEmployee(item:any){
        this.fullName = item.full_name;
        this.getRoleByAccount(item.id);
    }

    public save() {
        Swal.fire({
              title: "Bạn muốn thay đổi?",
              icon: "info",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Xác nhận thay đổi!",
              cancelButtonText: "Hủy"
            }).then((result) => {
              if (result.isConfirmed) {
                let checkedRadioId = $(".role:checked").attr("id");
                const req = {
                    authoID: this.authority.id,
                    roleName: checkedRadioId,
                    accountID: this.authority.accountId
                }
                this.authorityService.update(req).subscribe(
                    {
                        next: (resp) => {
                            if(resp.status == 201){
                                Swal.fire({
                                  title: "Xử lý thành công!",
                                  icon: "success"
                                });
                            }
                        },
                        error(err){
                            Swal.fire({
                              title: "Xử lý thất bại!",
                              icon: "error"
                            });
                            console.error(err);
                        }
                    }
                );
              }
            });
        
    }
}