import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-admin-navbar',
    imports: [],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})

export class AdminNavbarComponent implements OnInit{

    public isLogin= false;

    constructor(){}

    ngOnInit(): void {
        const account = localStorage.getItem('account');

        if(account){
            this.isLogin = true;
        }
    }

    public logout(){
        localStorage.removeItem('account');
        location.reload();
    }
}