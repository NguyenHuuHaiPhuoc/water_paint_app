import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { EmployeeComponent } from "./employee/employee.component";

@Component({
    selector: 'app-admin-sidenav-content',
    imports: [
        RouterOutlet,
        // EmployeeComponent
    ],
    templateUrl: './sidenav-content.component.html',
    styleUrl: './sidenav-content.component.scss'
})

 export class AdminSideNavContentComponent implements OnInit{
    constructor(){}

    ngOnInit(): void {
        
    }
 }