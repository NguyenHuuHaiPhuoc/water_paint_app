import { Component, OnInit } from "@angular/core";
import { AdminNavbarComponent } from "./navbar/navbar.component";
import { AdminSideNavNavComponent } from "./layout/sidenav-nav/sidenav-nav.component";
import { AdminSideNavContentComponent } from "./layout/sidenav-content/sidenav-content.component";
import { RouterOutlet } from "@angular/router";
import { AESUtil } from '../../util/aesUtil';

@Component({
    selector: 'app-admin',
    imports: [
        AdminNavbarComponent,
        AdminSideNavNavComponent,
        AdminSideNavContentComponent,
        // RouterOutlet
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})

 export class AdminComponent implements OnInit{

    constructor(){}

    ngOnInit(): void {
        const userProfile = sessionStorage.getItem('id_token_claims_obj')
                            || sessionStorage.getItem('profile_fbssls');

        setTimeout(() => {
            if (userProfile) {
                try {
                    const parsedProfile = JSON.parse(userProfile);
                    const profile = AESUtil.decrypt(parsedProfile.encryptedData);
                    
                } catch (error) {
                    console.error("Lỗi khi parse JSON hoặc decrypt:", error);
                }
            } else {
                console.error("Không tìm thấy dữ liệu trong sessionStorage.");
            }
        }, 1000);
    }
 }