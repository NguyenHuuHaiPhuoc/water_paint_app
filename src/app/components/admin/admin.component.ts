import { Component, OnInit } from "@angular/core";
import { AdminNavbarComponent } from "./navbar/navbar.component";
import { AdminSideNavNavComponent } from "./layout/sidenav-nav/sidenav-nav.component";
import { AdminSideNavContentComponent } from "./layout/sidenav-content/sidenav-content.component";
import { RouterOutlet } from "@angular/router";

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
        
    }
 }