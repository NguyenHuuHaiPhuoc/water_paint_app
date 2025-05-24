import { Component, OnInit } from "@angular/core";
import { AuthenService } from "../../../service/authen.service";
import { FaceBookService } from "../../../service/authenFaceBook.service";

declare const google: any;
@Component({
    selector: 'app-admin-navbar',
    imports: [],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    providers: [
        AuthenService,
        FaceBookService
    ]
})

export class AdminNavbarComponent implements OnInit{

    public typeLogin: string = '';

    constructor(
        private authenGoogleService: AuthenService,
        private authenFaceBookService: FaceBookService
    ){}

    ngOnInit(): void {
        const sessionGG = sessionStorage.getItem('id_token_claims_obj');
        const sessionFB = sessionStorage.getItem('fbssls_744812297874344');

        if(sessionGG){
            this.typeLogin = 'google';
        }

        if(sessionFB){
            this.typeLogin = 'facebook';
        }
    }

    public logoutAPP(){
        sessionStorage.removeItem("id_token_claims_obj");
    }

    public logoutGG(){
        this.authenGoogleService.logout();
        google.accounts.id.renderButton(document.getElementById("google-signin-btn"), {
            theme: "outline",
            size: "large"
        });
    }

    public logoutFB(){
        try{
            sessionStorage.removeItem("fbssls_744812297874344");
            this.authenFaceBookService.logout();
        } catch(error) {
            console.error("Lỗi xảy ra:", error);
            alert("Đã xảy ra lỗi! Kiểm tra Console để xem chi tiết.");
        }
    }
}