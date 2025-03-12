import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-our-company',
    imports: [
    ],
    templateUrl: './our-company.component.html',
    styleUrl: './our-company.component.scss'
})

export class OurCompanyComponent implements OnInit{

    public name:string = '';


    constructor(){}

    ngOnInit(): void {
        
    }
}